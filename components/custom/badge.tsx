import { cn } from "@/lib/utils";

export function CustomBadge({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={cn("py-1 text-[#F97316] font-semibold border-b-2 border-[#F97316] mb-1.5", className)}>
			{children}
		</div>
	);
}