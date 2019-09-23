// @flow

// Adapted from the Typescript definition in the 'rsmq' package.

declare class Rsmq {
	constructor(options: Rsmq$ConstructorOptions): this;

	quit(): void;

	createQueue(opts: Rsmq$CreateQueueOptions, cb: Callback<1>): void;
	createQueueAsync(opts: Rsmq$CreateQueueOptions): Promise<1>;
	listQueues(cb: Callback<string[]>): void;
	listQueuesAsync(): Promise<string[]>;
	deleteQueue(opts: Rsmq$DeleteQueueOptions, cb: Callback<1>): void;
	deleteQueueAsync(opts: Rsmq$DeleteQueueOptions): Promise<1>;
	getQueueAttributes(opts: Rsmq$GetQueueAttributesOptions, cb: Callback<Rsmq$QueueAttributes>): void;
	getQueueAttributesAsync(opts: Rsmq$GetQueueAttributesOptions): Promise<Rsmq$QueueAttributes>;
	setQueueAttributes(opts: Rsmq$SetQueueAttributesOptions, cb: Callback<Rsmq$QueueAttributes>): void;
	setQueueAttributesAsync(opts: Rsmq$SetQueueAttributesOptions): Promise<Rsmq$QueueAttributes>;

	sendMessage(opts: Rsmq$SendMessageOptions, cb: Callback<string>): void;
	sendMessageAsync(opts: Rsmq$SendMessageOptions): Promise<string>;
	receiveMessage(opts: Rsmq$ReceiveMessageOptions, cb: Callback<Rsmq$QueueMessage|{||}>): void;
	receiveMessageAsync(opts: Rsmq$ReceiveMessageOptions): Promise<Rsmq$QueueMessage|{||}>;
	popMessage(opts: Rsmq$PopMessageOptions, cb: Callback<Rsmq$QueueMessage|{||}>): void;
	popMessageAsync(opts: Rsmq$PopMessageOptions): Promise<Rsmq$QueueMessage|{||}>;
	deleteMessage(opts: Rsmq$DeleteMessageOptions, cb: Callback<0|1>): void;
	deleteMessageAsync(opts: Rsmq$DeleteMessageOptions): Promise<0|1>;
	changeMessageVisibility(opts: Rsmq$ChangeMessageVisibilityOptions, cb: Callback<0|1>): void;
	changeMessageVisibilityAsync(opts: Rsmq$ChangeMessageVisibilityOptions): Promise<0|1>;
}

declare module "rsmq" {
    declare module.exports: typeof Rsmq;
}

type Rsmq$ConstructorOptions = {|
    realtime?: boolean;
    host?: string;
    port?: number;
    ns?: string;
    options?: mixed;
    client?: mixed;
|};

type Rsmq$BaseOptions = {|
    // Queue name.
    // Maximum 160 characters; alphanumeric characters, hyphens (-), and underscores (_) are allowed.
    qname: string;
|};

type Rsmq$CreateQueueOptions = {|
    ...Rsmq$BaseOptions,
    // The length of time, in seconds, that a message received from a queue will
    // be invisible to other receiving components when they ask to receive messages.
    // Default: 30.
    // Allowed values: 0-9999999 (around 115 days).
    vt?: number;
    // The time in seconds that the delivery of all new messages in the queue will be delayed.
    // Default: 0.
    // Allowed values: 0-9999999 (around 115 days).
    delay?: number;
    // The maximum message size in bytes.  Default: 65536.
    // Allowed values: 1024-65536 and -1 (for unlimited size).
    maxsize?: number;
|};

type Rsmq$DeleteQueueOptions = Rsmq$BaseOptions;

type Rsmq$GetQueueAttributesOptions = Rsmq$BaseOptions;

type Rsmq$SetQueueAttributesOptions = {|
    ...Rsmq$BaseOptions,
    // The length of time, in seconds, that a message received from a queue will
    // be invisible to other receiving components when they ask to receive messages.
    // Allowed values: 0-9999999 (around 115 days).
    vt?: number;
    // The time in seconds that the delivery of all new messages in the queue will be delayed.
    // Allowed values: 0-9999999 (around 115 days).
    delay?: number;
    // The maximum message size in bytes.
    // Allowed values: 1024-65536 and -1 (for unlimited size).
    maxsize?: number;
|};


type Rsmq$SendMessageOptions = {|
    ...Rsmq$BaseOptions,
    message: string;
    // The time in seconds that the delivery of all new messages in the queue will be delayed.
    // Default: queue's configured 'delay' value.
    // Allowed values: 0-9999999 (around 115 days).
    delay?: number;
|}

type Rsmq$ReceiveMessageOptions = {|
    ...Rsmq$BaseOptions,
    // The length of time, in seconds, that a message received from a queue will
    // be invisible to other receiving components when they ask to receive messages.
    // Default: queue's configured 'vt' value.
    // Allowed values: 0-9999999 (around 115 days).
    vt?: number;
|};

type Rsmq$PopMessageOptions = Rsmq$BaseOptions;

type Rsmq$DeleteMessageOptions = {|
    ...Rsmq$BaseOptions,
    id: string;
|}

type Rsmq$ChangeMessageVisibilityOptions = {|
    ...Rsmq$BaseOptions,
    id: string;
    vt: number;
|};

type Rsmq$QueueMessage = {|
    message: string;
    id: string;
    // Timestamp of when this message was sent / created.
    sent: number;
    // Timestamp of when this message was first received.
    fr: number;
    // Number of times this message was received.
    rc: number;
|};

type Rsmq$QueueAttributes = {|
    vt: number;
    delay: number;
    maxsize: number;
    // Total number of messages received from the queue
    totalrecv: number;
    // Total number of messages sent to the queue
    totalsent: number;
    // Timestamp (epoch in seconds) when the queue was created
    created: number;
    // Timestamp (epoch in seconds) when the queue was last modified with `setQueueAttributes`
    modified: number;
    // Current number of messages in the queue
    msgs: number;
    // Current number of hidden / not visible messages.
    // A message can be hidden while "in flight" due to a `vt` parameter or when sent with a `delay`
    hiddenmsgs: number;
|};
