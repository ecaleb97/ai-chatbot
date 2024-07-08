"use client";

import { Heading } from "@/components/heading/heading";
import { Code } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { codeGenerationSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/share/loader";
import { Empty } from "@/components/share/empty";
import { UserAvatar } from "@/components/share/user-avatar";
import { AIAvatar } from "@/components/share/ai-avatar";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";

export default function CodeGenerationPage() {
	const router = useRouter();
	// const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
	const form = useForm<z.infer<typeof codeGenerationSchema>>({
		resolver: zodResolver(codeGenerationSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const { handleSubmit, messages, input, isLoading, handleInputChange } =
		useChat({
			api: "/api/code",
		});

	// const isLoading = form.formState.isSubmitting;

	// const onSubmit = async (values: z.infer<typeof codeGenerationSchema>) => {
	// 	try {
	// 		const userMessage: ChatCompletionMessageParam = {
	// 			role: "user",
	// 			content: values.prompt,
	// 		};

	// 		const newMessages = [...messages, userMessage];
	// 		const response = await axios.post("/api/code", {
	// 			messages: newMessages,
	// 		});
	// 		console.log(response);
	// 		setMessages((current) => [...current, userMessage, response.data]);
	// 		form.reset();
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		router.refresh();
	// 	}
	// };

	// const onSubmit = () => {
	// 	try {
	// 		handleSubmit();
	// 		form.reset();
	// 	} catch (error) {
	// 		console.log(error);
	// 	} finally {
	// 		router.refresh();
	// 	}
	// };

	return (
		<div>
			<Heading
				title="Code Generator"
				description="Generate code using descriptive text"
				iconColor="text-blue-500"
				bgColor="bg-blue-500/10"
				icon={Code}
			/>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							className="rounded-lg border w-full p-4 px-4 md:px-6 
							focus-within:shadow-sm grid grid-cols-12 gap-2"
							// onSubmit={form.handleSubmit(onSubmit)}
							onSubmit={handleSubmit}
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl>
											<Input
												// {...field}
												disabled={isLoading}
												onChange={handleInputChange}
												value={input}
												className="border-0 outline-none focus-visible:ring-0 
												focus-visible:ring-transparent"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="col-span-12 lg:col-span-2 w-full"
								disabled={isLoading}
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 my-4">
					{isLoading && (
						<div
							className="p-8 rounded-lg w-full flex items-center justify-center
							bg-muted"
						>
							<Loader />
						</div>
					)}
					{messages.length === 0 && !isLoading && (
						<Empty label="No messages yet" />
					)}
					<div className="flex flex-col-reverse gap-y-4 w-full">
						{messages.map((message) => {
							return (
								<div
									key={message.content}
									className={cn(
										"p-4 w-[90%] flex flex-col justify-start rounded-lg bg-muted",
										{
											"bg-white border border-black/10 ml-auto text-pretty sm:w-fit": message.role === "user",
										},
									)}
								>
									{message.role === "user" ? <UserAvatar /> : <AIAvatar />}
									<ReactMarkdown
										components={{
											pre: ({ node, ...props }) => (
												<div className="overflow-auto w-full my-2 bg-black/10 p-4 rounded-lg">
													<pre {...props} />
												</div>
											),
											code: ({ node, ...props }) => (
												<code
													className="bg-black/10 rounded-lg p-1"
													{...props}
												/>
											),
										}}
										className="text-sm overflow-hidden leading-7"
									>
										{message.content || ""}
									</ReactMarkdown>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
