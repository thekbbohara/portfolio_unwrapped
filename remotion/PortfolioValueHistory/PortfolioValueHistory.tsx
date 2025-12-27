import {
  AbsoluteFill,
  Audio,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { isMobileDevice } from "../Opening/devices";
import { PANE_BACKGROUND } from "../TopSectors/Pane";
import { TopTradingDay } from "./TopTradingDay";

type ValueHistoryItem = {
  value: number;
  time: string;
};

type Props = {
  portfolioValueHistory: Array<ValueHistoryItem>;
  topTradingDay: string;
  topTradingHour: string;
};

const Bar = (props: {
  readonly value: number;
  readonly index: number;
  readonly maxValue: number;
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const normalizedValue = props.maxValue > 0 ? props.value / props.maxValue : 0;

  const height = spring({
    fps,
    frame,
    from: 0,
    to: 100, // percentage
    config: {
      mass: normalizedValue * 10 + 0.1,
      damping: 200,
    },
    delay: 30 + props.index * 2,
  });

  return (
    <div
      style={{
        width: 30,
        height: `${height}%`,
        display: "flex",
        alignItems: "flex-end",
        borderRadius: 4,
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${normalizedValue * 100}%`,
          borderRadius: 4,
          backgroundColor: props.value === props.maxValue ? PANE_BACKGROUND : "#181B28",
          border: "3px solid rgba(255, 255, 255, 0.1)",
        }}
      />
    </div>
  );
};

const ValueHistoryGraph = (props: {
  readonly history: Array<ValueHistoryItem>;
  readonly style?: React.CSSProperties;
}) => {
  const maxValue = Math.max(
    ...props.history.map((p) => p.value),
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 10,
        height: 480,
        ...props.style,
      }}
    >
      {props.history.map((item, index) => {
        return (
          <div
            key={item.time} // Assuming time is unique
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <Bar
              index={index}
              value={item.value}
              maxValue={maxValue}
            />
            <div
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: 700,
                fontFamily: "Mona Sans",
              }}
            >
              {item.time}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DECELERATE_SOUND = staticFile("decelerate.mp3");

export const getPortfolioValueHistoryAssetToPrefetch = () => {
  return [DECELERATE_SOUND];
};

export const PortfolioValueHistory: React.FC<Props> = ({ portfolioValueHistory, topTradingDay, topTradingHour }) => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
      }}
    >
      {isMobileDevice() ? null : <Audio src={DECELERATE_SOUND} volume={0.8} />}
      <TopTradingDay
        values={[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ]}
        label="Best Trading Day"
        value={topTradingDay}
        radius={130}
        renderLabel={(value) => value}
        delay={60}
        soundDelay={95}
      />
      <br />
      <br />
      <TopTradingDay
        values={[
          "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",
          "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"
        ]}
        label="Best Trading Hour"
        value={topTradingHour}
        radius={300}
        delay={70}
        renderLabel={(value) => {
          if (value === "12") return "12 pm";
          if (value === "0") return "12 am";
          if (Number(value) > 12) return `${Number(value) - 12} pm`;
          return `${value} am`;
        }}
        soundDelay={120}
      />

      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ValueHistoryGraph history={portfolioValueHistory} />
      </div>
    </AbsoluteFill>
  );
};
