import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type NamesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Names {
  readonly id: string;
  readonly name?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Names, NamesMetaData>);
  static copyOf(source: Names, mutator: (draft: MutableModel<Names, NamesMetaData>) => MutableModel<Names, NamesMetaData> | void): Names;
}