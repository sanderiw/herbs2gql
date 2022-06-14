const { GraphQLScalarType } = require('graphql')

const VoidResolver = new GraphQLScalarType({
    name: 'Void',

    description: 'Represents NULL values',

    serialize() {
        return null
    },

    parseValue() {
        return null
    },

    parseLiteral() {
        return null
    }
})

module.exports = VoidResolver