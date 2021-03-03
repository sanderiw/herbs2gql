const assert = require("assert")
const { entity, field } = require("gotu")
const { entity2input } = require("../src/herbs2gql")

describe("Entity 2GQL Input", () => {

  context('when entity is valid', () => {
    it("should convert an entity to input", async () => {
      // given
      const givenAnInput = entity("An Entity", {
        stringField: field(String),
        stringArrayField: field([String]),
        numberField: field(Number),
        numberArrayField: field([Number]),
        stringWithPresence: field(String, {
          validation: { presence: true },
        }),
        stringArrayWithPresence: field([String], {
          validation: { presence: true },
        }),
        booleanField: field(Boolean),
        booleanArrayField: field([Boolean]),
        dateField: field(Date),
        dateArrayField: field([Date]),
        customEntityFunction: function () { }
      })

      // when
      const gql = entity2input(givenAnInput)

      // then
      assert.deepStrictEqual(
        gql,
        `input AnEntityInput {
stringField: String
stringArrayField: [String]
numberField: Float
numberArrayField: [Float]
stringWithPresence: String!
stringArrayWithPresence: [String]!
booleanField: Boolean
booleanArrayField: [Boolean]
dateField: Date
dateArrayField: [Date]
}`
      )
    })

    it("should convert an entity to input with not camel case", async () => {
      // given
      const givenAnInput = entity("An-Entity-", {
        stringField: field(String),
        stringArrayField: field([String]),
        numberField: field(Number),
        numberArrayField: field([Number]),
        stringWithPresence: field(String, {
          validation: { presence: true },
        }),
        stringArrayWithPresence: field([String], {
          validation: { presence: true },
        }),
        booleanField: field(Boolean),
        booleanArrayField: field([Boolean]),
        dateField: field(Date),
        dateArrayField: field([Date]),
        customEntityFunction: function () { }
      })

      // when
      const gql = entity2input(givenAnInput, false)

      // then
      assert.deepStrictEqual(
        gql,
        `input An-Entity-Input {
stringField: String
stringArrayField: [String]
numberField: Float
numberArrayField: [Float]
stringWithPresence: String!
stringArrayWithPresence: [String]!
booleanField: Boolean
booleanArrayField: [Boolean]
dateField: Date
dateArrayField: [Date]
}`
      )
    })

    it("should convert an entity to input with customName", async () => {
      // given
      const givenAnInput = entity("An Entity", {
        stringField: field(String),
        stringArrayField: field([String]),
        numberField: field(Number),
        numberArrayField: field([Number]),
        stringWithPresence: field(String, {
          validation: { presence: true },
        }),
        stringArrayWithPresence: field([String], {
          validation: { presence: true },
        }),
        booleanField: field(Boolean),
        booleanArrayField: field([Boolean]),
        dateField: field(Date),
        dateArrayField: field([Date]),
        customEntityFunction: function () { }
      })

      // when
      const gql = entity2input(givenAnInput, false, 'CustomName')

      // then
      assert.deepStrictEqual(
        gql,
        `input CustomNameInput {
stringField: String
stringArrayField: [String]
numberField: Float
numberArrayField: [Float]
stringWithPresence: String!
stringArrayWithPresence: [String]!
booleanField: Boolean
booleanArrayField: [Boolean]
dateField: Date
dateArrayField: [Date]
}`
      )
    })

    it("should convert a input with long name to type", async () => {
      // given
      const givenAnInput = entity("Chield GQL ", {
        stringField: field(String),
        stringArrayField: field([String]),
        numberField: field(Number),
        numberArrayField: field([Number]),
        stringWithPresence: field(String, {
          validation: { presence: true },
        }),
        stringArrayWithPresence: field([String], {
          validation: { presence: true },
        }),
        booleanField: field(Boolean),
        booleanArrayField: field([Boolean]),
        dateField: field(Date),
        dateArrayField: field([Date])
      })

      // when
      const gql = entity2input(givenAnInput)

      // then
      assert.deepStrictEqual(
        gql,
        `input ChieldGqlInput {
stringField: String
stringArrayField: [String]
numberField: Float
numberArrayField: [Float]
stringWithPresence: String!
stringArrayWithPresence: [String]!
booleanField: Boolean
booleanArrayField: [Boolean]
dateField: Date
dateArrayField: [Date]
}`
      )
    })

  })

  context('when entity is invalid', () => {

    it('should throw error if entity name is empty', async () => {
      // given
      const givenAnEntity = entity('', {
        stringField: field(String),
        stringArrayField: field([String]),
        numberField: field(Number),
        numberArrayField: field([Number]),
        stringWithPresence: field(String, {
          validation: { presence: true },
        }),
        stringArrayWithPresence: field([String], {
          validation: { presence: true },
        }),
        booleanField: field(Boolean),
        booleanArrayField: field([Boolean]),
        dateField: field(Date),
        dateArrayField: field([Date])
      })

      // then
      assert.throws(() => entity2input(givenAnEntity), {
        invalidArgs: {
          entityName: [{ cantBeEmpty: true }]
        }
      })
    })

  })

})
