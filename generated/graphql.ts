import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "homekong_db.ad" */
export type Homekong_Db_Ad = {
  __typename?: 'homekong_db_ad';
  alt: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  image_url: Scalars['String']['output'];
  link: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "homekong_db.ad". All fields are combined with a logical 'AND'. */
export type Homekong_Db_Ad_Bool_Exp = {
  _and?: InputMaybe<Array<Homekong_Db_Ad_Bool_Exp>>;
  _not?: InputMaybe<Homekong_Db_Ad_Bool_Exp>;
  _or?: InputMaybe<Array<Homekong_Db_Ad_Bool_Exp>>;
  alt?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  link?: InputMaybe<String_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "homekong_db.ad". */
export type Homekong_Db_Ad_Order_By = {
  alt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
};

/** select columns of table "homekong_db.ad" */
export enum Homekong_Db_Ad_Select_Column {
  /** column name */
  Alt = 'alt',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Link = 'link',
  /** column name */
  Location = 'location'
}

/** Streaming cursor of the table "homekong_db_ad" */
export type Homekong_Db_Ad_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Homekong_Db_Ad_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Homekong_Db_Ad_Stream_Cursor_Value_Input = {
  alt?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "homekong_db.question_type" */
export type Homekong_Db_Question_Type = {
  __typename?: 'homekong_db_question_type';
  questionType: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "homekong_db.question_type". All fields are combined with a logical 'AND'. */
export type Homekong_Db_Question_Type_Bool_Exp = {
  _and?: InputMaybe<Array<Homekong_Db_Question_Type_Bool_Exp>>;
  _not?: InputMaybe<Homekong_Db_Question_Type_Bool_Exp>;
  _or?: InputMaybe<Array<Homekong_Db_Question_Type_Bool_Exp>>;
  questionType?: InputMaybe<String_Comparison_Exp>;
};

export enum Homekong_Db_Question_Type_Enum {
  Checkbox = 'CHECKBOX',
  Currency = 'CURRENCY',
  Date = 'DATE',
  DateRange = 'DATE_RANGE',
  List = 'LIST',
  MultilineText = 'MULTILINE_TEXT',
  MultiSelect = 'MULTI_SELECT',
  Number = 'NUMBER',
  NumberRange = 'NUMBER_RANGE',
  NumberRangeSpinner = 'NUMBER_RANGE_SPINNER',
  NumberSpinner = 'NUMBER_SPINNER',
  Select = 'SELECT',
  Text = 'TEXT',
  UploadImg = 'UPLOAD_IMG'
}

/** Boolean expression to compare columns of type "homekong_db_question_type_enum". All fields are combined with logical 'AND'. */
export type Homekong_Db_Question_Type_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Homekong_Db_Question_Type_Enum>;
  _in?: InputMaybe<Array<Homekong_Db_Question_Type_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Homekong_Db_Question_Type_Enum>;
  _nin?: InputMaybe<Array<Homekong_Db_Question_Type_Enum>>;
};

/** Ordering options when selecting data from "homekong_db.question_type". */
export type Homekong_Db_Question_Type_Order_By = {
  questionType?: InputMaybe<Order_By>;
};

/** select columns of table "homekong_db.question_type" */
export enum Homekong_Db_Question_Type_Select_Column {
  /** column name */
  QuestionType = 'questionType'
}

/** Streaming cursor of the table "homekong_db_question_type" */
export type Homekong_Db_Question_Type_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Homekong_Db_Question_Type_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Homekong_Db_Question_Type_Stream_Cursor_Value_Input = {
  questionType?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "homekong_db.questions" */
export type Homekong_Db_Questions = {
  __typename?: 'homekong_db_questions';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  isRequired: Scalars['Boolean']['output'];
  maxLength?: Maybe<Scalars['Int']['output']>;
  maxNumber?: Maybe<Scalars['Int']['output']>;
  minLength?: Maybe<Scalars['Int']['output']>;
  minNumber?: Maybe<Scalars['Int']['output']>;
  options?: Maybe<Array<Scalars['String']['output']>>;
  questions: Scalars['String']['output'];
  /** An array relationship */
  service_questions: Array<Homekong_Db_Service_Questions>;
  /** An aggregate relationship */
  service_questions_aggregate: Homekong_Db_Service_Questions_Aggregate;
  type: Homekong_Db_Question_Type_Enum;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};


/** columns and relationships of "homekong_db.questions" */
export type Homekong_Db_QuestionsService_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Service_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Service_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
};


/** columns and relationships of "homekong_db.questions" */
export type Homekong_Db_QuestionsService_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Service_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Service_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
};

/** aggregated selection of "homekong_db.questions" */
export type Homekong_Db_Questions_Aggregate = {
  __typename?: 'homekong_db_questions_aggregate';
  aggregate?: Maybe<Homekong_Db_Questions_Aggregate_Fields>;
  nodes: Array<Homekong_Db_Questions>;
};

/** aggregate fields of "homekong_db.questions" */
export type Homekong_Db_Questions_Aggregate_Fields = {
  __typename?: 'homekong_db_questions_aggregate_fields';
  avg?: Maybe<Homekong_Db_Questions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Homekong_Db_Questions_Max_Fields>;
  min?: Maybe<Homekong_Db_Questions_Min_Fields>;
  stddev?: Maybe<Homekong_Db_Questions_Stddev_Fields>;
  stddev_pop?: Maybe<Homekong_Db_Questions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Homekong_Db_Questions_Stddev_Samp_Fields>;
  sum?: Maybe<Homekong_Db_Questions_Sum_Fields>;
  var_pop?: Maybe<Homekong_Db_Questions_Var_Pop_Fields>;
  var_samp?: Maybe<Homekong_Db_Questions_Var_Samp_Fields>;
  variance?: Maybe<Homekong_Db_Questions_Variance_Fields>;
};


/** aggregate fields of "homekong_db.questions" */
export type Homekong_Db_Questions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Homekong_Db_Questions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Homekong_Db_Questions_Avg_Fields = {
  __typename?: 'homekong_db_questions_avg_fields';
  maxLength?: Maybe<Scalars['Float']['output']>;
  maxNumber?: Maybe<Scalars['Float']['output']>;
  minLength?: Maybe<Scalars['Float']['output']>;
  minNumber?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "homekong_db.questions". All fields are combined with a logical 'AND'. */
export type Homekong_Db_Questions_Bool_Exp = {
  _and?: InputMaybe<Array<Homekong_Db_Questions_Bool_Exp>>;
  _not?: InputMaybe<Homekong_Db_Questions_Bool_Exp>;
  _or?: InputMaybe<Array<Homekong_Db_Questions_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isRequired?: InputMaybe<Boolean_Comparison_Exp>;
  maxLength?: InputMaybe<Int_Comparison_Exp>;
  maxNumber?: InputMaybe<Int_Comparison_Exp>;
  minLength?: InputMaybe<Int_Comparison_Exp>;
  minNumber?: InputMaybe<Int_Comparison_Exp>;
  options?: InputMaybe<String_Array_Comparison_Exp>;
  questions?: InputMaybe<String_Comparison_Exp>;
  service_questions?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
  service_questions_aggregate?: InputMaybe<Homekong_Db_Service_Questions_Aggregate_Bool_Exp>;
  type?: InputMaybe<Homekong_Db_Question_Type_Enum_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Homekong_Db_Questions_Max_Fields = {
  __typename?: 'homekong_db_questions_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  maxLength?: Maybe<Scalars['Int']['output']>;
  maxNumber?: Maybe<Scalars['Int']['output']>;
  minLength?: Maybe<Scalars['Int']['output']>;
  minNumber?: Maybe<Scalars['Int']['output']>;
  options?: Maybe<Array<Scalars['String']['output']>>;
  questions?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Homekong_Db_Questions_Min_Fields = {
  __typename?: 'homekong_db_questions_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  maxLength?: Maybe<Scalars['Int']['output']>;
  maxNumber?: Maybe<Scalars['Int']['output']>;
  minLength?: Maybe<Scalars['Int']['output']>;
  minNumber?: Maybe<Scalars['Int']['output']>;
  options?: Maybe<Array<Scalars['String']['output']>>;
  questions?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "homekong_db.questions". */
export type Homekong_Db_Questions_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isRequired?: InputMaybe<Order_By>;
  maxLength?: InputMaybe<Order_By>;
  maxNumber?: InputMaybe<Order_By>;
  minLength?: InputMaybe<Order_By>;
  minNumber?: InputMaybe<Order_By>;
  options?: InputMaybe<Order_By>;
  questions?: InputMaybe<Order_By>;
  service_questions_aggregate?: InputMaybe<Homekong_Db_Service_Questions_Aggregate_Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "homekong_db.questions" */
export enum Homekong_Db_Questions_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsRequired = 'isRequired',
  /** column name */
  MaxLength = 'maxLength',
  /** column name */
  MaxNumber = 'maxNumber',
  /** column name */
  MinLength = 'minLength',
  /** column name */
  MinNumber = 'minNumber',
  /** column name */
  Options = 'options',
  /** column name */
  Questions = 'questions',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Homekong_Db_Questions_Stddev_Fields = {
  __typename?: 'homekong_db_questions_stddev_fields';
  maxLength?: Maybe<Scalars['Float']['output']>;
  maxNumber?: Maybe<Scalars['Float']['output']>;
  minLength?: Maybe<Scalars['Float']['output']>;
  minNumber?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Homekong_Db_Questions_Stddev_Pop_Fields = {
  __typename?: 'homekong_db_questions_stddev_pop_fields';
  maxLength?: Maybe<Scalars['Float']['output']>;
  maxNumber?: Maybe<Scalars['Float']['output']>;
  minLength?: Maybe<Scalars['Float']['output']>;
  minNumber?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Homekong_Db_Questions_Stddev_Samp_Fields = {
  __typename?: 'homekong_db_questions_stddev_samp_fields';
  maxLength?: Maybe<Scalars['Float']['output']>;
  maxNumber?: Maybe<Scalars['Float']['output']>;
  minLength?: Maybe<Scalars['Float']['output']>;
  minNumber?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "homekong_db_questions" */
export type Homekong_Db_Questions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Homekong_Db_Questions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Homekong_Db_Questions_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  maxLength?: InputMaybe<Scalars['Int']['input']>;
  maxNumber?: InputMaybe<Scalars['Int']['input']>;
  minLength?: InputMaybe<Scalars['Int']['input']>;
  minNumber?: InputMaybe<Scalars['Int']['input']>;
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  questions?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Homekong_Db_Question_Type_Enum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Homekong_Db_Questions_Sum_Fields = {
  __typename?: 'homekong_db_questions_sum_fields';
  maxLength?: Maybe<Scalars['Int']['output']>;
  maxNumber?: Maybe<Scalars['Int']['output']>;
  minLength?: Maybe<Scalars['Int']['output']>;
  minNumber?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Homekong_Db_Questions_Var_Pop_Fields = {
  __typename?: 'homekong_db_questions_var_pop_fields';
  maxLength?: Maybe<Scalars['Float']['output']>;
  maxNumber?: Maybe<Scalars['Float']['output']>;
  minLength?: Maybe<Scalars['Float']['output']>;
  minNumber?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Homekong_Db_Questions_Var_Samp_Fields = {
  __typename?: 'homekong_db_questions_var_samp_fields';
  maxLength?: Maybe<Scalars['Float']['output']>;
  maxNumber?: Maybe<Scalars['Float']['output']>;
  minLength?: Maybe<Scalars['Float']['output']>;
  minNumber?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Homekong_Db_Questions_Variance_Fields = {
  __typename?: 'homekong_db_questions_variance_fields';
  maxLength?: Maybe<Scalars['Float']['output']>;
  maxNumber?: Maybe<Scalars['Float']['output']>;
  minLength?: Maybe<Scalars['Float']['output']>;
  minNumber?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "homekong_db.service_questions" */
export type Homekong_Db_Service_Questions = {
  __typename?: 'homekong_db_service_questions';
  display_order: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  /** An object relationship */
  question: Homekong_Db_Questions;
  question_id: Scalars['uuid']['output'];
  /** An object relationship */
  service: Homekong_Db_Services;
  service_code: Scalars['String']['output'];
};

/** aggregated selection of "homekong_db.service_questions" */
export type Homekong_Db_Service_Questions_Aggregate = {
  __typename?: 'homekong_db_service_questions_aggregate';
  aggregate?: Maybe<Homekong_Db_Service_Questions_Aggregate_Fields>;
  nodes: Array<Homekong_Db_Service_Questions>;
};

export type Homekong_Db_Service_Questions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Homekong_Db_Service_Questions_Aggregate_Bool_Exp_Count>;
};

export type Homekong_Db_Service_Questions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Homekong_Db_Service_Questions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "homekong_db.service_questions" */
export type Homekong_Db_Service_Questions_Aggregate_Fields = {
  __typename?: 'homekong_db_service_questions_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Homekong_Db_Service_Questions_Max_Fields>;
  min?: Maybe<Homekong_Db_Service_Questions_Min_Fields>;
};


/** aggregate fields of "homekong_db.service_questions" */
export type Homekong_Db_Service_Questions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Homekong_Db_Service_Questions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "homekong_db.service_questions" */
export type Homekong_Db_Service_Questions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Homekong_Db_Service_Questions_Max_Order_By>;
  min?: InputMaybe<Homekong_Db_Service_Questions_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "homekong_db.service_questions". All fields are combined with a logical 'AND'. */
export type Homekong_Db_Service_Questions_Bool_Exp = {
  _and?: InputMaybe<Array<Homekong_Db_Service_Questions_Bool_Exp>>;
  _not?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
  _or?: InputMaybe<Array<Homekong_Db_Service_Questions_Bool_Exp>>;
  display_order?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  question?: InputMaybe<Homekong_Db_Questions_Bool_Exp>;
  question_id?: InputMaybe<Uuid_Comparison_Exp>;
  service?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
  service_code?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Homekong_Db_Service_Questions_Max_Fields = {
  __typename?: 'homekong_db_service_questions_max_fields';
  display_order?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  question_id?: Maybe<Scalars['uuid']['output']>;
  service_code?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "homekong_db.service_questions" */
export type Homekong_Db_Service_Questions_Max_Order_By = {
  display_order?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
  service_code?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Homekong_Db_Service_Questions_Min_Fields = {
  __typename?: 'homekong_db_service_questions_min_fields';
  display_order?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  question_id?: Maybe<Scalars['uuid']['output']>;
  service_code?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "homekong_db.service_questions" */
export type Homekong_Db_Service_Questions_Min_Order_By = {
  display_order?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
  service_code?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "homekong_db.service_questions". */
export type Homekong_Db_Service_Questions_Order_By = {
  display_order?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  question?: InputMaybe<Homekong_Db_Questions_Order_By>;
  question_id?: InputMaybe<Order_By>;
  service?: InputMaybe<Homekong_Db_Services_Order_By>;
  service_code?: InputMaybe<Order_By>;
};

/** select columns of table "homekong_db.service_questions" */
export enum Homekong_Db_Service_Questions_Select_Column {
  /** column name */
  DisplayOrder = 'display_order',
  /** column name */
  Id = 'id',
  /** column name */
  QuestionId = 'question_id',
  /** column name */
  ServiceCode = 'service_code'
}

/** Streaming cursor of the table "homekong_db_service_questions" */
export type Homekong_Db_Service_Questions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Homekong_Db_Service_Questions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Homekong_Db_Service_Questions_Stream_Cursor_Value_Input = {
  display_order?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  question_id?: InputMaybe<Scalars['uuid']['input']>;
  service_code?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "homekong_db.services" */
export type Homekong_Db_Services = {
  __typename?: 'homekong_db_services';
  code: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  isParentService?: Maybe<Scalars['Boolean']['output']>;
  name_en?: Maybe<Scalars['String']['output']>;
  name_zh?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  parentService?: Maybe<Homekong_Db_Services>;
  parent_id?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  service_questions: Array<Homekong_Db_Service_Questions>;
  /** An aggregate relationship */
  service_questions_aggregate: Homekong_Db_Service_Questions_Aggregate;
  step_name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  subServices: Array<Homekong_Db_Services>;
  /** An aggregate relationship */
  subServices_aggregate: Homekong_Db_Services_Aggregate;
};


/** columns and relationships of "homekong_db.services" */
export type Homekong_Db_ServicesService_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Service_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Service_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
};


/** columns and relationships of "homekong_db.services" */
export type Homekong_Db_ServicesService_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Service_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Service_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
};


/** columns and relationships of "homekong_db.services" */
export type Homekong_Db_ServicesSubServicesArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Services_Order_By>>;
  where?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
};


/** columns and relationships of "homekong_db.services" */
export type Homekong_Db_ServicesSubServices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Services_Order_By>>;
  where?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
};

/** aggregated selection of "homekong_db.services" */
export type Homekong_Db_Services_Aggregate = {
  __typename?: 'homekong_db_services_aggregate';
  aggregate?: Maybe<Homekong_Db_Services_Aggregate_Fields>;
  nodes: Array<Homekong_Db_Services>;
};

export type Homekong_Db_Services_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Homekong_Db_Services_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Homekong_Db_Services_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Homekong_Db_Services_Aggregate_Bool_Exp_Count>;
};

export type Homekong_Db_Services_Aggregate_Bool_Exp_Bool_And = {
  arguments: Homekong_Db_Services_Select_Column_Homekong_Db_Services_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Homekong_Db_Services_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Homekong_Db_Services_Select_Column_Homekong_Db_Services_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Homekong_Db_Services_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Homekong_Db_Services_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "homekong_db.services" */
export type Homekong_Db_Services_Aggregate_Fields = {
  __typename?: 'homekong_db_services_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Homekong_Db_Services_Max_Fields>;
  min?: Maybe<Homekong_Db_Services_Min_Fields>;
};


/** aggregate fields of "homekong_db.services" */
export type Homekong_Db_Services_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Homekong_Db_Services_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "homekong_db.services" */
export type Homekong_Db_Services_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Homekong_Db_Services_Max_Order_By>;
  min?: InputMaybe<Homekong_Db_Services_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "homekong_db.services". All fields are combined with a logical 'AND'. */
export type Homekong_Db_Services_Bool_Exp = {
  _and?: InputMaybe<Array<Homekong_Db_Services_Bool_Exp>>;
  _not?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
  _or?: InputMaybe<Array<Homekong_Db_Services_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  icon?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isParentService?: InputMaybe<Boolean_Comparison_Exp>;
  name_en?: InputMaybe<String_Comparison_Exp>;
  name_zh?: InputMaybe<String_Comparison_Exp>;
  parentService?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
  parent_id?: InputMaybe<Uuid_Comparison_Exp>;
  service_questions?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
  service_questions_aggregate?: InputMaybe<Homekong_Db_Service_Questions_Aggregate_Bool_Exp>;
  step_name?: InputMaybe<String_Comparison_Exp>;
  subServices?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
  subServices_aggregate?: InputMaybe<Homekong_Db_Services_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Homekong_Db_Services_Max_Fields = {
  __typename?: 'homekong_db_services_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name_en?: Maybe<Scalars['String']['output']>;
  name_zh?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['uuid']['output']>;
  step_name?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "homekong_db.services" */
export type Homekong_Db_Services_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  icon?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name_en?: InputMaybe<Order_By>;
  name_zh?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  step_name?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Homekong_Db_Services_Min_Fields = {
  __typename?: 'homekong_db_services_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name_en?: Maybe<Scalars['String']['output']>;
  name_zh?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['uuid']['output']>;
  step_name?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "homekong_db.services" */
export type Homekong_Db_Services_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  icon?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name_en?: InputMaybe<Order_By>;
  name_zh?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  step_name?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "homekong_db.services". */
export type Homekong_Db_Services_Order_By = {
  code?: InputMaybe<Order_By>;
  icon?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isParentService?: InputMaybe<Order_By>;
  name_en?: InputMaybe<Order_By>;
  name_zh?: InputMaybe<Order_By>;
  parentService?: InputMaybe<Homekong_Db_Services_Order_By>;
  parent_id?: InputMaybe<Order_By>;
  service_questions_aggregate?: InputMaybe<Homekong_Db_Service_Questions_Aggregate_Order_By>;
  step_name?: InputMaybe<Order_By>;
  subServices_aggregate?: InputMaybe<Homekong_Db_Services_Aggregate_Order_By>;
};

/** select columns of table "homekong_db.services" */
export enum Homekong_Db_Services_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  IsParentService = 'isParentService',
  /** column name */
  NameEn = 'name_en',
  /** column name */
  NameZh = 'name_zh',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  StepName = 'step_name'
}

/** select "homekong_db_services_aggregate_bool_exp_bool_and_arguments_columns" columns of table "homekong_db.services" */
export enum Homekong_Db_Services_Select_Column_Homekong_Db_Services_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsParentService = 'isParentService'
}

/** select "homekong_db_services_aggregate_bool_exp_bool_or_arguments_columns" columns of table "homekong_db.services" */
export enum Homekong_Db_Services_Select_Column_Homekong_Db_Services_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsParentService = 'isParentService'
}

/** Streaming cursor of the table "homekong_db_services" */
export type Homekong_Db_Services_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Homekong_Db_Services_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Homekong_Db_Services_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isParentService?: InputMaybe<Scalars['Boolean']['input']>;
  name_en?: InputMaybe<Scalars['String']['input']>;
  name_zh?: InputMaybe<Scalars['String']['input']>;
  parent_id?: InputMaybe<Scalars['uuid']['input']>;
  step_name?: InputMaybe<Scalars['String']['input']>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "homekong_db.ad" */
  homekong_db_ad: Array<Homekong_Db_Ad>;
  /** fetch data from the table: "homekong_db.ad" using primary key columns */
  homekong_db_ad_by_pk?: Maybe<Homekong_Db_Ad>;
  /** fetch data from the table: "homekong_db.question_type" */
  homekong_db_question_type: Array<Homekong_Db_Question_Type>;
  /** fetch data from the table: "homekong_db.question_type" using primary key columns */
  homekong_db_question_type_by_pk?: Maybe<Homekong_Db_Question_Type>;
  /** fetch data from the table: "homekong_db.questions" */
  homekong_db_questions: Array<Homekong_Db_Questions>;
  /** fetch aggregated fields from the table: "homekong_db.questions" */
  homekong_db_questions_aggregate: Homekong_Db_Questions_Aggregate;
  /** fetch data from the table: "homekong_db.questions" using primary key columns */
  homekong_db_questions_by_pk?: Maybe<Homekong_Db_Questions>;
  /** fetch data from the table: "homekong_db.service_questions" */
  homekong_db_service_questions: Array<Homekong_Db_Service_Questions>;
  /** fetch aggregated fields from the table: "homekong_db.service_questions" */
  homekong_db_service_questions_aggregate: Homekong_Db_Service_Questions_Aggregate;
  /** fetch data from the table: "homekong_db.service_questions" using primary key columns */
  homekong_db_service_questions_by_pk?: Maybe<Homekong_Db_Service_Questions>;
  /** fetch data from the table: "homekong_db.services" */
  homekong_db_services: Array<Homekong_Db_Services>;
  /** fetch aggregated fields from the table: "homekong_db.services" */
  homekong_db_services_aggregate: Homekong_Db_Services_Aggregate;
  /** fetch data from the table: "homekong_db.services" using primary key columns */
  homekong_db_services_by_pk?: Maybe<Homekong_Db_Services>;
};


export type Query_RootHomekong_Db_AdArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Ad_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Ad_Order_By>>;
  where?: InputMaybe<Homekong_Db_Ad_Bool_Exp>;
};


export type Query_RootHomekong_Db_Ad_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootHomekong_Db_Question_TypeArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Question_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Question_Type_Order_By>>;
  where?: InputMaybe<Homekong_Db_Question_Type_Bool_Exp>;
};


export type Query_RootHomekong_Db_Question_Type_By_PkArgs = {
  questionType: Scalars['String']['input'];
};


export type Query_RootHomekong_Db_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Questions_Bool_Exp>;
};


export type Query_RootHomekong_Db_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Questions_Bool_Exp>;
};


export type Query_RootHomekong_Db_Questions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootHomekong_Db_Service_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Service_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Service_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
};


export type Query_RootHomekong_Db_Service_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Service_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Service_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
};


export type Query_RootHomekong_Db_Service_Questions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootHomekong_Db_ServicesArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Services_Order_By>>;
  where?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
};


export type Query_RootHomekong_Db_Services_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Services_Order_By>>;
  where?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
};


export type Query_RootHomekong_Db_Services_By_PkArgs = {
  code: Scalars['String']['input'];
  id: Scalars['uuid']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "homekong_db.ad" */
  homekong_db_ad: Array<Homekong_Db_Ad>;
  /** fetch data from the table: "homekong_db.ad" using primary key columns */
  homekong_db_ad_by_pk?: Maybe<Homekong_Db_Ad>;
  /** fetch data from the table in a streaming manner: "homekong_db.ad" */
  homekong_db_ad_stream: Array<Homekong_Db_Ad>;
  /** fetch data from the table: "homekong_db.question_type" */
  homekong_db_question_type: Array<Homekong_Db_Question_Type>;
  /** fetch data from the table: "homekong_db.question_type" using primary key columns */
  homekong_db_question_type_by_pk?: Maybe<Homekong_Db_Question_Type>;
  /** fetch data from the table in a streaming manner: "homekong_db.question_type" */
  homekong_db_question_type_stream: Array<Homekong_Db_Question_Type>;
  /** fetch data from the table: "homekong_db.questions" */
  homekong_db_questions: Array<Homekong_Db_Questions>;
  /** fetch aggregated fields from the table: "homekong_db.questions" */
  homekong_db_questions_aggregate: Homekong_Db_Questions_Aggregate;
  /** fetch data from the table: "homekong_db.questions" using primary key columns */
  homekong_db_questions_by_pk?: Maybe<Homekong_Db_Questions>;
  /** fetch data from the table in a streaming manner: "homekong_db.questions" */
  homekong_db_questions_stream: Array<Homekong_Db_Questions>;
  /** fetch data from the table: "homekong_db.service_questions" */
  homekong_db_service_questions: Array<Homekong_Db_Service_Questions>;
  /** fetch aggregated fields from the table: "homekong_db.service_questions" */
  homekong_db_service_questions_aggregate: Homekong_Db_Service_Questions_Aggregate;
  /** fetch data from the table: "homekong_db.service_questions" using primary key columns */
  homekong_db_service_questions_by_pk?: Maybe<Homekong_Db_Service_Questions>;
  /** fetch data from the table in a streaming manner: "homekong_db.service_questions" */
  homekong_db_service_questions_stream: Array<Homekong_Db_Service_Questions>;
  /** fetch data from the table: "homekong_db.services" */
  homekong_db_services: Array<Homekong_Db_Services>;
  /** fetch aggregated fields from the table: "homekong_db.services" */
  homekong_db_services_aggregate: Homekong_Db_Services_Aggregate;
  /** fetch data from the table: "homekong_db.services" using primary key columns */
  homekong_db_services_by_pk?: Maybe<Homekong_Db_Services>;
  /** fetch data from the table in a streaming manner: "homekong_db.services" */
  homekong_db_services_stream: Array<Homekong_Db_Services>;
};


export type Subscription_RootHomekong_Db_AdArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Ad_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Ad_Order_By>>;
  where?: InputMaybe<Homekong_Db_Ad_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_Ad_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootHomekong_Db_Ad_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Homekong_Db_Ad_Stream_Cursor_Input>>;
  where?: InputMaybe<Homekong_Db_Ad_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_Question_TypeArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Question_Type_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Question_Type_Order_By>>;
  where?: InputMaybe<Homekong_Db_Question_Type_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_Question_Type_By_PkArgs = {
  questionType: Scalars['String']['input'];
};


export type Subscription_RootHomekong_Db_Question_Type_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Homekong_Db_Question_Type_Stream_Cursor_Input>>;
  where?: InputMaybe<Homekong_Db_Question_Type_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Questions_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Questions_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_Questions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootHomekong_Db_Questions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Homekong_Db_Questions_Stream_Cursor_Input>>;
  where?: InputMaybe<Homekong_Db_Questions_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_Service_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Service_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Service_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_Service_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Service_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Service_Questions_Order_By>>;
  where?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_Service_Questions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootHomekong_Db_Service_Questions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Homekong_Db_Service_Questions_Stream_Cursor_Input>>;
  where?: InputMaybe<Homekong_Db_Service_Questions_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_ServicesArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Services_Order_By>>;
  where?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_Services_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Homekong_Db_Services_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Homekong_Db_Services_Order_By>>;
  where?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
};


export type Subscription_RootHomekong_Db_Services_By_PkArgs = {
  code: Scalars['String']['input'];
  id: Scalars['uuid']['input'];
};


export type Subscription_RootHomekong_Db_Services_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Homekong_Db_Services_Stream_Cursor_Input>>;
  where?: InputMaybe<Homekong_Db_Services_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type GetServicesCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServicesCategoriesQuery = { __typename?: 'query_root', categories: Array<{ __typename?: 'homekong_db_services', id: any, icon?: string | null, code: string, name_en?: string | null, name_zh?: string | null, isParentService?: boolean | null }> };

export type GetSubServicesQueryVariables = Exact<{
  parent_code: Scalars['String']['input'];
}>;


export type GetSubServicesQuery = { __typename?: 'query_root', services: Array<{ __typename?: 'homekong_db_services', id: any, icon?: string | null, code: string, name_en?: string | null, name_zh?: string | null, isParentService?: boolean | null, subServices_aggregate: { __typename?: 'homekong_db_services_aggregate', aggregate?: { __typename?: 'homekong_db_services_aggregate_fields', count: number } | null } }> };

export type GetServiceQuestionQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type GetServiceQuestionQuery = { __typename?: 'query_root', homekong_db_services: Array<{ __typename?: 'homekong_db_services', id: any, name_en?: string | null, name_zh?: string | null, code: string, icon?: string | null, isParentService?: boolean | null, service_questions: Array<{ __typename?: 'homekong_db_service_questions', question: { __typename?: 'homekong_db_questions', id: any, options?: Array<string> | null, questions: string, type: Homekong_Db_Question_Type_Enum } }> }> };


export const GetServicesCategoriesDocument = gql`
    query GetServicesCategories {
  categories: homekong_db_services(where: {parent_id: {_is_null: true}}) {
    id
    icon
    code
    name_en
    name_zh
    isParentService
  }
}
    `;

/**
 * __useGetServicesCategoriesQuery__
 *
 * To run a query within a React component, call `useGetServicesCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServicesCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetServicesCategoriesQuery, GetServicesCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesCategoriesQuery, GetServicesCategoriesQueryVariables>(GetServicesCategoriesDocument, options);
      }
export function useGetServicesCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesCategoriesQuery, GetServicesCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesCategoriesQuery, GetServicesCategoriesQueryVariables>(GetServicesCategoriesDocument, options);
        }
export function useGetServicesCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServicesCategoriesQuery, GetServicesCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServicesCategoriesQuery, GetServicesCategoriesQueryVariables>(GetServicesCategoriesDocument, options);
        }
export type GetServicesCategoriesQueryHookResult = ReturnType<typeof useGetServicesCategoriesQuery>;
export type GetServicesCategoriesLazyQueryHookResult = ReturnType<typeof useGetServicesCategoriesLazyQuery>;
export type GetServicesCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetServicesCategoriesSuspenseQuery>;
export type GetServicesCategoriesQueryResult = Apollo.QueryResult<GetServicesCategoriesQuery, GetServicesCategoriesQueryVariables>;
export const GetSubServicesDocument = gql`
    query GetSubServices($parent_code: String!) {
  services: homekong_db_services(
    where: {parentService: {code: {_eq: $parent_code}}}
  ) {
    id
    icon
    code
    name_en
    name_zh
    isParentService
    subServices_aggregate {
      aggregate {
        count
      }
    }
  }
}
    `;

/**
 * __useGetSubServicesQuery__
 *
 * To run a query within a React component, call `useGetSubServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubServicesQuery({
 *   variables: {
 *      parent_code: // value for 'parent_code'
 *   },
 * });
 */
export function useGetSubServicesQuery(baseOptions: Apollo.QueryHookOptions<GetSubServicesQuery, GetSubServicesQueryVariables> & ({ variables: GetSubServicesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubServicesQuery, GetSubServicesQueryVariables>(GetSubServicesDocument, options);
      }
export function useGetSubServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubServicesQuery, GetSubServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubServicesQuery, GetSubServicesQueryVariables>(GetSubServicesDocument, options);
        }
export function useGetSubServicesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubServicesQuery, GetSubServicesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubServicesQuery, GetSubServicesQueryVariables>(GetSubServicesDocument, options);
        }
export type GetSubServicesQueryHookResult = ReturnType<typeof useGetSubServicesQuery>;
export type GetSubServicesLazyQueryHookResult = ReturnType<typeof useGetSubServicesLazyQuery>;
export type GetSubServicesSuspenseQueryHookResult = ReturnType<typeof useGetSubServicesSuspenseQuery>;
export type GetSubServicesQueryResult = Apollo.QueryResult<GetSubServicesQuery, GetSubServicesQueryVariables>;
export const GetServiceQuestionDocument = gql`
    query GetServiceQuestion($code: String!) {
  homekong_db_services(where: {code: {_eq: $code}}) {
    id
    name_en
    name_zh
    code
    icon
    isParentService
    service_questions {
      question {
        id
        options
        questions
        type
      }
    }
  }
}
    `;

/**
 * __useGetServiceQuestionQuery__
 *
 * To run a query within a React component, call `useGetServiceQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceQuestionQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetServiceQuestionQuery(baseOptions: Apollo.QueryHookOptions<GetServiceQuestionQuery, GetServiceQuestionQueryVariables> & ({ variables: GetServiceQuestionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceQuestionQuery, GetServiceQuestionQueryVariables>(GetServiceQuestionDocument, options);
      }
export function useGetServiceQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceQuestionQuery, GetServiceQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceQuestionQuery, GetServiceQuestionQueryVariables>(GetServiceQuestionDocument, options);
        }
export function useGetServiceQuestionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetServiceQuestionQuery, GetServiceQuestionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetServiceQuestionQuery, GetServiceQuestionQueryVariables>(GetServiceQuestionDocument, options);
        }
export type GetServiceQuestionQueryHookResult = ReturnType<typeof useGetServiceQuestionQuery>;
export type GetServiceQuestionLazyQueryHookResult = ReturnType<typeof useGetServiceQuestionLazyQuery>;
export type GetServiceQuestionSuspenseQueryHookResult = ReturnType<typeof useGetServiceQuestionSuspenseQuery>;
export type GetServiceQuestionQueryResult = Apollo.QueryResult<GetServiceQuestionQuery, GetServiceQuestionQueryVariables>;