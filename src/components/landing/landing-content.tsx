import { testimonials } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LandingContent() {
	return (
		<div className="px-10 pb-20">
			<h2 className="text-center text-3xl md:text-4xl text-white font-extrabold mb-10">
				Testimonials
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{testimonials.map((testimonial, index) => (
					<Card key={index} className="bg-[#192339] border-none text-white">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2">
								<div>
									<p className="text-lg">{testimonial.name}</p>
									<p className="text-zinc-400 text-sm">{testimonial.title}</p>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent className="text-sm">
							{testimonial.description}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}