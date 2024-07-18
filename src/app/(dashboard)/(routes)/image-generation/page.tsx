"use client";

import { Heading } from "@/components/heading/heading";
import { Download, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	amountOptions,
	imagesGeneratorSchema,
	resolutionOptions,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/share/loader";
import { Empty } from "@/components/share/empty";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "sonner";

export default function ImageGenerationPage() {
	const router = useRouter();
	const { onOpenModal } = useProModal();
	const [images, setImages] = useState<string[]>([]);
	const form = useForm<z.infer<typeof imagesGeneratorSchema>>({
		resolver: zodResolver(imagesGeneratorSchema),
		defaultValues: {
			prompt: "",
			amount: "1",
			resolution: "256x256",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const handleSubmit = async (
		values: z.infer<typeof imagesGeneratorSchema>,
	) => {
		try {
			setImages([]);
			console.log(values);
			const response = await axios.post("/api/image", values);
			console.log(response.data);
			console.log(typeof response.data);
			const urls = response.data.split("\n");
			// const urls = response.data.map((image: { url: string }) => image.url);
			console.log(urls);
			setImages((current) => [...current, ...urls]);
			console.log(images);
			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				onOpenModal();
			} else {
				toast.error("Something went wrong");
			}
			console.log(error);
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Image Generator"
				description="Generate images using descriptive text"
				iconColor="text-pink-500"
				bgColor="bg-pink-500/10"
				icon={ImageIcon}
			/>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							// onSubmit={handleSubmit}
							onSubmit={form.handleSubmit(handleSubmit)}
							className="rounded-lg border w-full p-4 px-4 md:px-6 
							focus-within:shadow-sm grid grid-cols-12 gap-2"
						>
							<FormField
								control={form.control}
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-6">
										<FormControl>
											<Input
												placeholder="A picture of the Empire State"
												disabled={isLoading}
												{...field}
												className="border-0 outline-none focus-visible:ring-0 
												focus-visible:ring-transparent"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								name="amount"
								control={form.control}
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-2">
										<Select
											disabled={isLoading}
											value={field.value}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Amount" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{amountOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								name="resolution"
								control={form.control}
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-2">
										<Select
											disabled={isLoading}
											value={field.value}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Resolution" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{resolutionOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
						<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
							<Loader />
						</div>
					)}
					{images.length === 0 && !isLoading && (
						<Empty label="No images generated yet" />
					)}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
					{images.map((image) => (
						<Card key={image} className="rounded-lg overflow-hidden">
							<CardContent className="relative aspect-square p-0">
								<Image
									src={image}
									alt="Image"
									className="object-cover size-full"
									width="150"
									height="150"
								/>
							</CardContent>
							<CardFooter className="p-3">
								<Button
									variant="secondary"
									className="w-full p-0"
									onClick={() => window.open(image)}
								>
									<Download className="size-4 mr-2" />
									Download
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
