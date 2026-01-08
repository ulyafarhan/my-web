import { Timeline } from "@/types/domain";

interface TimelineItemProps {
  data: Timeline;
  isLast?: boolean;
}

export const TimelineItem = ({ data, isLast }: TimelineItemProps) => {
  return (
    <div className="relative flex gap-8 pb-12 last:pb-0">
      {!isLast && (
        <div className="absolute left-[7px] top-2 h-full w-[2px] bg-gray-100" />
      )}
      <div className="relative z-10 mt-1.5 h-4 w-4 rounded-full border-4 border-white bg-blue-600 ring-1 ring-blue-600" />
      <div className="flex flex-col">
        <span className="text-sm font-bold tracking-wider text-blue-600 uppercase">
          {data.year}
        </span>
        <h3 className="mt-1 text-lg font-bold text-gray-900">
          {data.label}
        </h3>
        <span className="text-sm font-medium text-gray-500">
          {data.sub_label}
        </span>
        {data.description && (
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            {data.description}
          </p>
        )}
      </div>
    </div>
  );
};