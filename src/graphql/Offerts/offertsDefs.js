import { gql } from "apollo-server-core";
import { createOffert } from "../../helpers/tasks/offert/createOffert.js";

export const offertsSchema = gql`
  enum TypeOffert {
    PLAYER
    TRAINER
  }

  input CreateOffertInput {
    owner: ID!
    to: [ID]!
    salary: Float
    mount: Float
    team: ID!
    type: TypeOffert!
  }

  interface Offert {
    _id: ID!
    owner: User!
    accepted: Boolean!
    salary: Float!
    team: Team!
  }

  type PlayerOffert implements Offert {
    _id: ID!
    owner: User!
    accepted: Boolean!
    salary: Float!
    player: Player!
    mount: Float!
    team: Team!
  }

  type TrainerOffert implements Offert {
    _id: ID!
    owner: User!
    accepted: Boolean!
    salary: Float!
    trainer: Trainer!
    team: Team!
  }

  type Mutation {
    createOffert(offert: CreateOffertInput!): [ID]!
  }
`;

export const offertsResolvers = {
  Query: {},
  Mutation: {
    createOffert: (root, args) => createOffert(args.offert),
  },
};