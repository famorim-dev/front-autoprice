export default function Card({
    icon,
    title,
    value,
    description,
}: {
    icon: React.ReactNode
    title: string
    value: string
    description: string
}) {
    return (
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm transition hover:shadow-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-surface">
                {icon}
            </div>

            <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {title}
                </p>

                <p className="mt-1 truncate text-2xl font-bold text-foreground">
                    {value}
                </p>

                <p className="mt-1 truncate text-xs text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    )
}