import { useMemo } from 'react'
import { geoPath, geoMercator, geoBounds } from 'd3'
import { feature } from 'topojson-client'
import countriesTopology from 'world-atlas/countries-110m.json'

const MAP_WIDTH = 760
const MAP_HEIGHT = 520

const COUNTRY_NAME_NORMALISERS = new Map([
  ['Bosnia and Herz.', 'Bosnia and Herzegovina'],
  ['Czechia', 'Czech Republic'],
  ['Macedonia', 'Republic of North Macedonia'],
  ['Moldova', 'Republic of Moldova'],
  ['Turkey', 'Türkiye'],
])

const EUROPEAN_COUNTRY_NAMES = new Set([
  'Albania',
  'Armenia',
  'Austria',
  'Belgium',
  'Bosnia and Herz.',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Georgia',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Macedonia',
  'Malta',
  'Moldova',
  'Montenegro',
  'Netherlands',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Serbia',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Switzerland',
  'Turkey',
  'Ukraine',
  'United Kingdom',
])

const EUROPE_BOUNDARY = {
  minLatitude: 32,
  maxLatitude: 72,
  minLongitude: -25,
  maxLongitude: 45,
}
const getDisplayCountryName = (name) => COUNTRY_NAME_NORMALISERS.get(name) ?? name

export default function EuropeMap({ countriesWithMembers }) {
  const { countries, matchedParticipants } = useMemo(() => {
    const participatingCountries = new Set(countriesWithMembers)

    const worldFeatures = feature(countriesTopology, countriesTopology.objects.countries).features
    const europeanFeatures = worldFeatures.filter(({ properties, geometry }) => {
      if (!EUROPEAN_COUNTRY_NAMES.has(properties.name)) {
        return false
      }

      const bounds = geoBounds({ type: 'Feature', geometry, properties })
      const [[minLon, minLat], [maxLon, maxLat]] = bounds

      return (
        maxLon >= EUROPE_BOUNDARY.minLongitude &&
        minLon <= EUROPE_BOUNDARY.maxLongitude &&
        maxLat >= EUROPE_BOUNDARY.minLatitude &&
        minLat <= EUROPE_BOUNDARY.maxLatitude
      )
    })

    const foundParticipants = new Map(
      europeanFeatures
        .filter(({ properties }) => participatingCountries.has(getDisplayCountryName(properties.name)))
        .map((featureItem) => [featureItem.properties.name, featureItem]),
    )

    return {
      countries: europeanFeatures,
      matchedParticipants: foundParticipants,
    }
  }, [countriesWithMembers])

  const projection = useMemo(() => {
    const projectionInstance = geoMercator()
    const focusFeatures = matchedParticipants.size > 0 ? Array.from(matchedParticipants.values()) : countries

    if (focusFeatures.length > 0) {
      const featureCollection = { type: 'FeatureCollection', features: focusFeatures }
      const padding = matchedParticipants.size > 0 ? 60 : 28
      projectionInstance.fitExtent(
        [
          [padding, padding],
          [MAP_WIDTH - padding, MAP_HEIGHT - padding],
        ],
        featureCollection,
      )
    } else {
      projectionInstance
        .center([20, 55])
        .scale(600)
        .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2])
    }

    return projectionInstance
  }, [countries, matchedParticipants])

  const pathGenerator = useMemo(() => geoPath(projection), [projection])

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      role="img"
      aria-label="Map of Europe highlighting participating countries"
      className="w-full"
    >
      <defs>
        <linearGradient id="europe-map-background" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#020617" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#europe-map-background)" />

      {countries.map((countryFeature) => {
        const path = pathGenerator(countryFeature)

        if (!path) {
          return null
        }

        const countryName = countryFeature.properties.name
        const isHighlighted = matchedParticipants.has(countryName)
        const label = getDisplayCountryName(countryName)

        return (
          <path
            key={countryName}
            d={path}
            fill={isHighlighted ? '#f59e0b' : '#64748b'}
            fillOpacity={isHighlighted ? 0.9 : 0.45}
            stroke="#f1f5f9"
            strokeOpacity={0.3}
            strokeWidth={0.6}
          >
            <title>{label}</title>
          </path>
        )
      })}

    </svg>
  )
}
