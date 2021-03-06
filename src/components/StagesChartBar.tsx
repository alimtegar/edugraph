type Props = {
    bgColor?: string,
    title?: string,
    value?: number,
    width?: string,
};

const StagesChartBar = ({ bgColor, title, value, width = `${1 / 8 * 100}%`, }: Props) => (
    <div className="text-center px-1" style={{
        width: width,
    }}>
        <div className="relative flex justify-center items-end bg-gray-500 bg-opacity-10 w-full h-40 rounded-lg overflow-hidden">
            {bgColor && value !== undefined && (
                <>
                    <div
                        className={`bg-${bgColor} text-white w-full rounded-lg`}
                        style={{
                            height: value ? `${value}%` : 3,
                        }}
                    >
                    </div>
                    <span className={`absolute top-0 font-semibold text-xs text-${value > 90 ? 'white' : 'gray-500'} w-full text-center p-2`}>
                        {value}
                    </span>
                </>
            )}
        </div>
        {title && (<span className="font-semibold text-xs">{title}</span>)}
    </div>
);

export default StagesChartBar;