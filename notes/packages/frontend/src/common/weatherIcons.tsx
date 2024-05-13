import Icon, {
	type CustomIconComponentProps,
} from '@ant-design/icons/lib/components/Icon';
import SunDuotone from '@phosphor-icons/core/duotone/sun-duotone.svg?react';
import MoonDuotone from '@phosphor-icons/core/duotone/moon-duotone.svg?react';
import CloudSunDuotone from '@phosphor-icons/core/duotone/cloud-sun-duotone.svg?react';
import CloudMoonDuotone from '@phosphor-icons/core/duotone/cloud-moon-duotone.svg?react';
import CloudDuotone from '@phosphor-icons/core/duotone/cloud-duotone.svg?react';
import CloudLightningDuotone from '@phosphor-icons/core/duotone/cloud-lightning-duotone.svg?react';
import CloudRainDuotone from '@phosphor-icons/core/duotone/cloud-rain-duotone.svg?react';
import RainDuotone from '@phosphor-icons/core/duotone/cloud-rain-duotone.svg?react';
import TornadoDuotone from '@phosphor-icons/core/duotone/tornado-duotone.svg?react';
import SnowDuotone from '@phosphor-icons/core/duotone/snowflake-duotone.svg?react';
import MistDuotone from '@phosphor-icons/core/duotone/cloud-fog-duotone.svg?react';

export type IconComponent = (
	props: Partial<CustomIconComponentProps>,
) => JSX.Element;

const SunDayIcon: IconComponent = (props) => (
	<Icon component={SunDuotone} {...props} />
);

const MoonNightIcon: IconComponent = (props) => (
	<Icon component={MoonDuotone} {...props} />
);

const FewCloudsDayIcon: IconComponent = (props) => (
	<Icon component={CloudSunDuotone} {...props} />
);

const FewCloudsNightIcon: IconComponent = (props) => (
	<Icon component={CloudMoonDuotone} {...props} />
);

const ScatteredCloudsDayIcon: IconComponent = (props) => (
	<Icon component={CloudDuotone} {...props} />
);

const ScatteredCloudsNightIcon: IconComponent = (props) => (
	<Icon component={CloudDuotone} {...props} />
);

const BrokenCloudsDayIcon: IconComponent = (props) => (
	<Icon component={CloudSunDuotone} {...props} />
);

const BrokenCloudsNightIcon: IconComponent = (props) => (
	<Icon component={CloudSunDuotone} {...props} />
);

const ShowerRainDayIcon: IconComponent = (props) => (
	<Icon component={CloudLightningDuotone} {...props} />
);

const ShowerRainNightIcon: IconComponent = (props) => (
	<Icon component={CloudRainDuotone} {...props} />
);

const RainDayIcon: IconComponent = (props) => (
	<Icon component={RainDuotone} {...props} />
);

const RainNightIcon: IconComponent = (props) => (
	<Icon component={RainDuotone} {...props} />
);

const ThunderstormDayIcon: IconComponent = (props) => (
	<Icon component={TornadoDuotone} {...props} />
);

const ThunderstormNightIcon: IconComponent = (props) => (
	<Icon component={TornadoDuotone} {...props} />
);

const SnowDayIcon: IconComponent = (props) => (
	<Icon component={SnowDuotone} {...props} />
);

const SnowNightIcon: IconComponent = (props) => (
	<Icon component={SnowDuotone} {...props} />
);

const MistDayIcon: IconComponent = (props) => (
	<Icon component={MistDuotone} {...props} />
);

const MistNightIcon: IconComponent = (props) => (
	<Icon component={MistDuotone} {...props} />
);

export const getWeatherIcon = (weatherCode: string): IconComponent => {
	switch (weatherCode) {
		case '01d':
			return SunDayIcon;
		case '01n':
			return MoonNightIcon;
		case '02d':
			return FewCloudsDayIcon;
		case '02n':
			return FewCloudsNightIcon;
		case '03d':
			return ScatteredCloudsDayIcon;
		case '03n':
			return ScatteredCloudsNightIcon;
		case '04d':
			return BrokenCloudsDayIcon;
		case '04n':
			return BrokenCloudsNightIcon;
		case '09d':
			return ShowerRainDayIcon;
		case '09n':
			return ShowerRainNightIcon;
		case '10d':
			return RainDayIcon;
		case '10n':
			return RainNightIcon;
		case '11d':
			return ThunderstormDayIcon;
		case '11n':
			return ThunderstormNightIcon;
		case '13d':
			return SnowDayIcon;
		case '13n':
			return SnowNightIcon;
		case '50d':
			return MistDayIcon;
		case '50n':
			return MistNightIcon;
	}
	return SunDayIcon;
};
