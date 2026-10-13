export default function FlagBadge({ className }: { className?: string }) {
  return (
    <span className={className} title="Việt Nam">
      <svg className="size-6 shadow-sm rounded-sm overflow-hidden" viewBox="0 0 30 20" fill="none">
        <rect width="30" height="20" fill="#DA251D" />
        <polygon
          points="15,4 17.06,10.34 23.73,10.34 18.33,14.26 20.39,20.6 15,16.68 9.61,20.6 11.67,14.26 6.27,10.34 12.94,10.34"
          fill="#FFFF00"
          transform="scale(0.8) translate(3.75, 2)"
        />
      </svg>
    </span>
  );
}
