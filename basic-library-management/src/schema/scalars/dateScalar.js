const { GraphQLScalarType } = require("graphql");

const DateScalar = new GraphQLScalarType({
  name: "Date",

  // Converts Date to string when sending to client
  serialize: (value) => value.toISOString(),

  // Converts client input string to Date object
  parseValue: (value) => new Date(value),

  // Converts AST (Abstract Syntax Tree) literal to Date
  parseLiteral: (ast) => new Date(ast.value),
});

module.exports = DateScalar;
