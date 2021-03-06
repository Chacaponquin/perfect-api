import { gql } from "apollo-server-core";
import { createPlayer } from "../../helpers/tasks/player/createPlayer.js";
import { createRandomPlayer } from "../../helpers/tasks/player/createRandomPlayer.js";
import { deletePlayer } from "../../helpers/tasks/player/deletePlayer.js";
import { fetchAllPlayers } from "../../helpers/tasks/player/fetchAllPlayers.js";
import { fetchOwnPlayers } from "../../helpers/tasks/player/fetchOwnPlayers.js";
import { findFreePlayers } from "../../helpers/tasks/player/findFreePlayers.js";
import { transferPlayer } from "../../helpers/tasks/player/transferPlayer.js";

export const playerSchema = gql`
  enum Genders {
    MALE
    FEMALE
  }

  input PlayerFilterInput {
    name: String
    league: String
  }

  input TransferPlayerInput {
    teamFrom: String!
    teamTo: String!
    player: String!
    price: Int
  }

  input PlayerInput {
    birth: String!
    pos: String!
    firstName: String!
    lastName: String!
    country: String!
    gender: String!
    imageUrl: String!
  }

  input FetchOwnPlayersInput {
    teamID: ID!
  }

  type PlayerTeam {
    image: String!
    name: String!
  }

  type PlayerSeasonRecord {
    yearStart: Int!
    yearFinish: Int
    minutes: Int!
    assists: Int!
    matchPlayed: Int!
    goals: Int!
  }

  type PlayerTotalStats {
    totalGoals: Int!
    totalAssists: Int!
  }

  type Player {
    _id: ID!
    image: String!
    fullName: String!
    country: String!
    gender: Gender!
    position: String!
    age: Int!
    actualTeamInf: PlayerTeam!
    actualPrice: Float!
    totalStats: PlayerTotalStats!
    seasonRecords: [PlayerSeasonRecord]!
  }

  type Query {
    findFreePlayers: [Player]!
    fetchOwnPlayers(team: FetchOwnPlayersInput!): [Player]!
    fetchAllPlayers(playerFilter: PlayerFilterInput): [Player]!
  }

  type Mutation {
    createRandomPlayer: Player!
    transferPlayer(data: TransferPlayerInput!): ID!
    createPlayer(player: PlayerInput!): ID!
    deletePlayer(players: [ID]!): ID!
  }
`;

export const playerResolver = {
  Query: {
    findFreePlayers: () => findFreePlayers(),
    fetchOwnPlayers: (root, args) => fetchOwnPlayers(args.team),
    fetchAllPlayers: (root, args) => fetchAllPlayers(args.playerFilter),
  },
  Mutation: {
    createRandomPlayer: () => createRandomPlayer(),
    createPlayer: (root, args, context) =>
      createPlayer(args.player, context.currentUser),
    transferPlayer: (root, args) => transferPlayer(args.data),
    deletePlayer: (root, args) => deletePlayer(args.players),
  },
};
