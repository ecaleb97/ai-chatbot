"use client";

import { Heading } from "@/components/heading/heading";
import { AIAvatar } from "@/components/share/ai-avatar";
import { Empty } from "@/components/share/empty";
import { Loader } from "@/components/share/loader";
import { UserAvatar } from "@/components/share/user-avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "ai/react";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { conversationSchema } from "./schema";
import { useProModal } from "@/hooks/use-pro-modal";

export default function ConversationPage() {
	const router = useRouter();
	const { onOpenModal } = useProModal();
	const { messages, handleSubmit, handleInputChange, input, error, isLoading } =
		useChat({
			api: "/api/conversation",
			onFinish: () => {
				router.refresh();
			},
		});
	const form = useForm<z.infer<typeof conversationSchema>>({
		resolver: zodResolver(conversationSchema),
		defaultValues: {
			prompt: "",
		},
	});

	useEffect(() => {
		if (error) {
			onOpenModal();
			toast.error(error.message, {
				className: "bg-red-200",
			});
		}
	}, [error, onOpenModal]);

	return (
		<div>
			<Heading
				title="Conversation"
				description="Our most conversation model"
				iconColor="text-violet-500"
				bgColor="bg-violet-500/10"
				icon={MessageSquare}
			/>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={handleSubmit}
							// onSubmit={form.handleSubmit(onSubmit)}
							className="rounded-lg border w-full p-4 px-4 md:px-6
							focus-within:shadow-sm grid grid-cols-12 gap-2"
						>
							<FormField
								name="prompt"
								control={form.control}
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl>
											<Input
												placeholder="How do I calculate the area of a circle?"
												disabled={isLoading}
												onChange={handleInputChange}
												value={input}
												// {...field}
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
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((message) => {
							return (
								<div
									key={crypto.randomUUID()}
									className={cn("flex flex-col justify-start", {
										"justify-end items-end": message.role === "user",
									})}
								>
									<div>
										<div>
											{message.role === "user" ? <UserAvatar /> : <AIAvatar />}
										</div>
										<div
											className={cn(
												`flex flex-col p-4 rounded-lg bg-slate-100 w-fit
											whitespace-pre-wrap text-sm text-slate-500`,
												{
													"bg-slate-100": message.role !== "user",
												},
											)}
										>
											{message.content}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
