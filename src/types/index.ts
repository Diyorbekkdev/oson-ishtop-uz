import { FormApi, ReactFormApi } from "@tanstack/react-form";
import {
  DefaultError,
  InfiniteData,
  UseInfiniteQueryResult,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { ZodValidator } from "@tanstack/zod-form-adapter";

export type TStatus = "initial" | "loading" | "error" | "success";

export type TUserRole =
  | "owner"
  | "manager"
  | "accountant"
  | "waiter"
  | "chef"
  | "barman"
  | "runner";

export type QueryResult<T> = UseQueryResult<T | null | undefined, Error>;

export type InfiniteQueryResult<T> = UseInfiniteQueryResult<
  InfiniteData<T | null | undefined>
>;

export type MutationResult<T = void> = UseMutationResult<
  any,
  Error,
  T,
  unknown
>;

export type TanstackForm<T> = FormApi<T, ZodValidator> &
  ReactFormApi<T, ZodValidator>;

export type AppMutationResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown
> = UseMutationResult<TData, TError, TVariables, TContext>;

export enum NOTIFICATION_TYPE {
	SUCCESS = "success",
	ERROR = "error",
	WARNING = "warning",
	INFO = "info",
}

export interface NotificationMessage {
	title: string;
	subtitle: string;
	kind: NOTIFICATION_TYPE;
}