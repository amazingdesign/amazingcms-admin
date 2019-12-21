export const findFirstLevelSlugFields = (schema) => {
  if (!schema || !schema.properties) return []

  const properties = schema.properties

  if (typeof properties !== 'object') return []

  return Object.entries(properties).reduce(
    (r, [fieldName, field]) => {
      const from = (
        field &&
        field.uniforms &&
        field.uniforms.slug
      )

      if (!from) return r

      return [...r, { fieldName, from }]
    },
    []
  )
}

export default findFirstLevelSlugFields