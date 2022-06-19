import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextField } from '../../src/options/components/TextField/TextField';
import { faker } from '@faker-js/faker';

const story: ComponentMeta<typeof TextField> = {
  component: TextField,
};

export default story;

const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const Default = Template.bind({});

Default.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
};

export const Disabled = Template.bind({});

Disabled.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
  disabled: true,
};

export const WithoutValue = Template.bind({});

WithoutValue.args = {
  value: undefined,
  placeholder: 'Placeholder when input is empty',
  type: 'url',
};

export const WithChangeHandler = Template.bind({});

WithChangeHandler.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
  changeHandler: (): void => {
    alert('Changed value!');
  },
};

export const WithChangeHandlerAndDisabled = Template.bind({});

WithChangeHandlerAndDisabled.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
  changeHandler: (): void => {
    alert('Changed value!');
  },
  disabled: true,
};

export const InLoadingState = Template.bind({});

InLoadingState.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
  loading: true,
};

export const InLoadingStateAndDisabled = Template.bind({});

InLoadingStateAndDisabled.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
  loading: true,
  disabled: true,
};

export const WithVeryLongValue = Template.bind({});

WithVeryLongValue.args = {
  value:
    'https://longurlmaker.com/go?id=1CanURLcbe9URLHawk083YepIt1XZse72lofty57farawayu1043FhURLNe18a03WapURLlengthened17YepItRubyURL0NutshellURL0enlarged11lengthydistant3enlargedYepIt17230r2Ulimittoweringb8farZreachinglastinguFhURLEzURL5101m301URLRubyURLdistantrShrinkrd1TinyURLqk4361bdew110jspreadZouthed1Dwarfurlkcontinued1SimURLIsZgd8dDigBigdeep82e0811protractedNanoRef08aenlarged7stretching41ganglingo5371PiURLcontinued0514007h20bNe110NanoRefLiteURLlankyhigh1SHurl3IsZgdlofty1hURLPieganglingstringybstretch02NotLongspreadZout17spunZout931ienduringd1148010A2Nelongated4farZreachingglasting401Smallr9o0h5protracted2aq101lanky111763SHurldeepShrtndrangy97d0d5rangyMyURLo1B653farZreachingldoutstretched53a43expanded1ShortURLShortenURLn1tallprotracted4toutstretchedEzURLfarZreachingDoiopspreadZoutd0outstretchedspunZoutNutshellURLf81075longish9gfc72tge11MooURL30133r4580184302farZreaching029Fly20deepMooURL63loftyextensiveexpandedlastingweoutstretchedIsZgdfb7621qey110NutshellURL3CanURLMinilien17400prolongedShortURL19090v11ShortenURL2l4elongatedoutstretchedvdistant00MooURLb2Shortlinksc10lingeringe0lankyBeamZtoelongateu4spreadZout546felongate0lengthened00NanoRef0cy0dspreadZoutdistantg7SimURL30263URLCutterShoterLink1210781ganglingstringy10vspunZout50CanURL0b1Ulimit8farZreaching07x10stretchingexpandeddistantURLcuthigh04SHurla10highf0MyURL7aURlZiePiURL1x00a124NutshellURL1008YATUC31s731112fGetShortytall1a5farawaya041loftyURLviz07IsZgd010Shrtndx01104prangyiSHurl55StartURL0Dwarfurl1IsZgd6URL131k4427dPiURL5a7911701src8de001ShoterLink84b1k5ganglingd60lingeringj7181zUlimitstretchinglengthy40ShortURLTraceURLgreatdrawnZoute6expandedtIsZgd9ShredURLe1lanky053URLPie16105019Shrtnd02s16remote027elongateFhURLganglingceSHurlrunning4nXilGetShortylankyab3TinyLink1011continuedURLvid58b10y964SHurl0expanded1DigBigenlarged7moutstretched008runningcDigBigstretchedfremoteUlimit50longish234wlanky0extensivestretchinglfenlargedu7301URL07301URLspunZoutstretching1sl1farZreachingbtok16bNe1636734ay2spreadZout20GetShortylasting0851r0c5lengthenedlingering40TightURL4drawnZoutf0lofty81stretchhigh08dendurin',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
};

export const WithVeryLongPlaceholder = Template.bind({});

WithVeryLongPlaceholder.args = {
  value: undefined,
  placeholder: faker.lorem.words(200),
  type: 'url',
};

export const WithPattern = Template.bind({});

WithPattern.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  pattern: '^https://google\\.com$',
  type: 'url',
};

export const WithValidationFunction = Template.bind({});

WithValidationFunction.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
  validate: (newValue): string | undefined => {
    if (newValue !== 'https://google.com') {
      return 'Value may only be "https://google.com"!';
    }

    return undefined;
  },
};
