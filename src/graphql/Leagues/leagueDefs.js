import { gql } from "apollo-server-core";
import { createLeague } from "../../helpers/tasks/league/createLeague.js";
import { findAvailibleLeagues } from "../../helpers/tasks/league/findAvailibleLeagues.js";
import { getAllLeagues } from "../../helpers/tasks/league/getAllLeagues.js";

export const leagueSchema = gql`
  input LeagueInput {
    name: String
    country: String
  }

  type League {
    _id: ID!
    name: String
  }

  type Query {
    findAvailibleLeagues: [League]!
    getAllLeagues: [League]!
  }

  type Mutation {
    createLeague(league: LeagueInput): League!
  }
`;

export const leagueResolvers = {
  Query: {
    findAvailibleLeagues: () => findAvailibleLeagues(),
    getAllLeagues: () => getAllLeagues(),
  },
  Mutation: {
    createLeague: (root, args) => createLeague(args),
  },
};
