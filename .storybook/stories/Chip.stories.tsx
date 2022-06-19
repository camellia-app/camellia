import { faker } from '@faker-js/faker';
import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Chip } from '../../src/components/Chip/Chip';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const icon = require('mdi/filled/local_florist.svg?fill=%23eee');

const story: ComponentMeta<typeof Chip> = {
  component: Chip,
};

export default story;

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;

export const Default = Template.bind({});

Default.args = {
  iconSrc: icon,
  label: 'Default',
  shape: 'rounded',
  url: 'https://google.com',
};

export const LinkWithRoundedShape = Template.bind({});

LinkWithRoundedShape.args = {
  iconSrc: icon,
  label: 'With Rounded Shape',
  shape: 'rounded',
  tooltip: 'Test',
  url: 'https://google.com',
};

export const LinkWithSquaredShape = Template.bind({});

LinkWithSquaredShape.args = {
  iconSrc: icon,
  label: 'With Squared Shape',
  shape: 'squared',
  tooltip: 'Test',
  url: 'https://google.com',
};

export const LinkWithInlinedImage = Template.bind({});

LinkWithInlinedImage.args = {
  iconSrc: icon,
  label: 'With Inlined Image',
  shape: 'rounded',
  url: 'https://google.com',
};

export const LinkWithRemoteImage = Template.bind({});

LinkWithRemoteImage.args = {
  iconSrc: 'https://google.com/favicon.ico',
  label: 'With Remote Image',
  shape: 'rounded',
  url: 'https://google.com',
};

export const LinkWithRemoteImageThatFailsToLoad = Template.bind({});

LinkWithRemoteImageThatFailsToLoad.args = {
  iconSrc: 'https://google.com/favicon.wrong-url.ico',
  label: 'With Remote Image That Fails To Load',
  shape: 'rounded',
  url: 'https://google.com',
};

export const LinkWithRemoteImageThatFailsToLoadAndUsesInlinedImageAsFallback = Template.bind({});

LinkWithRemoteImageThatFailsToLoadAndUsesInlinedImageAsFallback.args = {
  fallbackIconSrc: icon,
  iconSrc: 'https://google.com/favicon.wrong-url.ico',
  label: 'With Remote Image That Fails To Load And Uses Inlined Image As Fallback',
  shape: 'rounded',
  url: 'https://google.com',
};

export const LinkWithTooltip = Template.bind({});

LinkWithTooltip.args = {
  iconSrc: icon,
  label: 'With Tooltip',
  shape: 'rounded',
  tooltip: 'This is tooltip that will appear when you hover a cursor over the chip',
  url: 'https://google.com',
};

export const LinkInLoadingState = Template.bind({});

LinkInLoadingState.args = {
  iconSrc: icon,
  label: 'In Loading State',
  shape: 'rounded',
  isLoading: true,
  url: 'https://google.com',
};

export const LinkWithClickHandler = Template.bind({});

LinkWithClickHandler.args = {
  iconSrc: icon,
  label: 'With Click Handler',
  shape: 'rounded',
  url: 'https://google.com',
  clickAction: (): void => {
    action('clickAction');
  },
};

export const LinkWithAutofocus = Template.bind({});

LinkWithAutofocus.args = {
  iconSrc: icon,
  label: 'With Autofocus',
  shape: 'rounded',
  url: 'https://google.com',
  focus: true,
};

export const LinkUnderloadedWithContent = Template.bind({});

LinkUnderloadedWithContent.args = {
  iconSrc: icon,
  label: 'A',
  shape: 'rounded',
  tooltip: 'A',
  url: 'https://a.com',
};

export const LinkOverloadedWithContent = Template.bind({});

LinkOverloadedWithContent.args = {
  iconSrc: icon,
  label: faker.lorem.words(100),
  shape: 'rounded',
  tooltip: faker.lorem.words(100),
  url: 'https://longurlmaker.com/go?id=1CanURLcbe9URLHawk083YepIt1XZse72lofty57farawayu1043FhURLNe18a03WapURLlengthened17YepItRubyURL0NutshellURL0enlarged11lengthydistant3enlargedYepIt17230r2Ulimittoweringb8farZreachinglastinguFhURLEzURL5101m301URLRubyURLdistantrShrinkrd1TinyURLqk4361bdew110jspreadZouthed1Dwarfurlkcontinued1SimURLIsZgd8dDigBigdeep82e0811protractedNanoRef08aenlarged7stretching41ganglingo5371PiURLcontinued0514007h20bNe110NanoRefLiteURLlankyhigh1SHurl3IsZgdlofty1hURLPieganglingstringybstretch02NotLongspreadZout17spunZout931ienduringd1148010A2Nelongated4farZreachingglasting401Smallr9o0h5protracted2aq101lanky111763SHurldeepShrtndrangy97d0d5rangyMyURLo1B653farZreachingldoutstretched53a43expanded1ShortURLShortenURLn1tallprotracted4toutstretchedEzURLfarZreachingDoiopspreadZoutd0outstretchedspunZoutNutshellURLf81075longish9gfc72tge11MooURL30133r4580184302farZreaching029Fly20deepMooURL63loftyextensiveexpandedlastingweoutstretchedIsZgdfb7621qey110NutshellURL3CanURLMinilien17400prolongedShortURL19090v11ShortenURL2l4elongatedoutstretchedvdistant00MooURLb2Shortlinksc10lingeringe0lankyBeamZtoelongateu4spreadZout546felongate0lengthened00NanoRef0cy0dspreadZoutdistantg7SimURL30263URLCutterShoterLink1210781ganglingstringy10vspunZout50CanURL0b1Ulimit8farZreaching07x10stretchingexpandeddistantURLcuthigh04SHurla10highf0MyURL7aURlZiePiURL1x00a124NutshellURL1008YATUC31s731112fGetShortytall1a5farawaya041loftyURLviz07IsZgd010Shrtndx01104prangyiSHurl55StartURL0Dwarfurl1IsZgd6URL131k4427dPiURL5a7911701src8de001ShoterLink84b1k5ganglingd60lingeringj7181zUlimitstretchinglengthy40ShortURLTraceURLgreatdrawnZoute6expandedtIsZgd9ShredURLe1lanky053URLPie16105019Shrtnd02s16remote027elongateFhURLganglingceSHurlrunning4nXilGetShortylankyab3TinyLink1011continuedURLvid58b10y964SHurl0expanded1DigBigenlarged7moutstretched008runningcDigBigstretchedfremoteUlimit50longish234wlanky0extensivestretchinglfenlargedu7301URL07301URLspunZoutstretching1sl1farZreachingbtok16bNe1636734ay2spreadZout20GetShortylasting0851r0c5lengthenedlingering40TightURL4drawnZoutf0lofty81stretchhigh08dendurin',
};

export const ButtonWithRoundedShape = Template.bind({});

ButtonWithRoundedShape.args = {
  iconSrc: icon,
  label: 'With Rounded Shape',
  shape: 'rounded',
  tooltip: 'Test',
};

export const ButtonWithSquaredShape = Template.bind({});

ButtonWithSquaredShape.args = {
  iconSrc: icon,
  label: 'With Squared Shape',
  shape: 'squared',
  tooltip: 'Test',
};

export const ButtonWithInlinedImage = Template.bind({});

ButtonWithInlinedImage.args = {
  iconSrc: icon,
  label: 'With Inlined Image',
  shape: 'rounded',
};

export const ButtonWithRemoteImage = Template.bind({});

ButtonWithRemoteImage.args = {
  iconSrc: 'https://google.com/favicon.ico',
  label: 'With Remote Image',
  shape: 'rounded',
};

export const ButtonWithRemoteImageThatFailsToLoad = Template.bind({});

ButtonWithRemoteImageThatFailsToLoad.args = {
  iconSrc: 'https://google.com/favicon.wrong-url.ico',
  label: 'With Remote Image That Fails To Load',
  shape: 'rounded',
};

export const ButtonWithRemoteImageThatFailsToLoadAndUsesInlinedImageAsFallback = Template.bind({});

ButtonWithRemoteImageThatFailsToLoadAndUsesInlinedImageAsFallback.args = {
  fallbackIconSrc: icon,
  iconSrc: 'https://google.com/favicon.wrong-url.ico',
  label: 'With Remote Image That Fails To Load And Uses Inlined Image As Fallback',
  shape: 'rounded',
};

export const ButtonWithTooltip = Template.bind({});

ButtonWithTooltip.args = {
  iconSrc: icon,
  label: 'With Tooltip',
  shape: 'rounded',
  tooltip: 'This is tooltip that will appear when you hover a cursor over the chip',
};

export const ButtonInLoadingState = Template.bind({});

ButtonInLoadingState.args = {
  iconSrc: icon,
  label: 'In Loading State',
  shape: 'rounded',
  isLoading: true,
};

export const ButtonWithClickHandler = Template.bind({});

ButtonWithClickHandler.args = {
  iconSrc: icon,
  label: 'With Click Handler',
  shape: 'rounded',
  clickAction: (): void => {
    action('clickAction');
  },
};

export const ButtonWithAutofocus = Template.bind({});

ButtonWithAutofocus.args = {
  iconSrc: icon,
  label: 'With Autofocus',
  shape: 'rounded',
  focus: true,
};

export const ButtonUnderloadedWithContent = Template.bind({});

ButtonUnderloadedWithContent.args = {
  iconSrc: icon,
  label: 'A',
  shape: 'rounded',
  tooltip: 'A',
};

export const ButtonOverloadedWithContent = Template.bind({});

ButtonOverloadedWithContent.args = {
  iconSrc: icon,
  label: faker.lorem.words(100),
  shape: 'rounded',
  tooltip: faker.lorem.words(100),
};
