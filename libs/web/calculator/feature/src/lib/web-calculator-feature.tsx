import {
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  useWebCalculator,
  WebCalculatorProvider,
} from '@kin-laboratory/web/calculator/data-access';
import { WebUiCard } from '@kin-laboratory/web/ui/card';
import { WebUiPage } from '@kin-laboratory/web/ui/page';

export function WebCalculatorFeature() {
  return (
    <WebCalculatorProvider>
      <WebCalculator />
    </WebCalculatorProvider>
  );
}

export function WebCalculator() {
  const {
    creationCount,
    creationMax,
    creationPrice,
    creationTotal,
    setCreationCount,
    setTransactionCount,
    total,
    transactionCount,
    transactionMax,
    transactionPrice,
    transactionTotal,
  } = useWebCalculator();

  return (
    <WebUiPage
      title="Solana Fee Calculator"
      subtitle="Enter the amount of Account Creations and Transactions to calculate the fee"
    >
      <WebUiCard>
        <Stack spacing={6}>
          <Flex justifyContent={'space-between'}>
            <Heading size="md">Creations</Heading>
            <Text size="sm" color="gray.500">
              {creationPrice} SOL
            </Text>
          </Flex>

          <SliderCounter
            min={0}
            max={creationMax}
            value={creationCount}
            setValue={setCreationCount}
          />

          <Flex justifyContent={'space-between'}>
            <Heading size="md">Transactions</Heading>
            <Text size="sm" color="gray.500">
              {transactionPrice} SOL
            </Text>
          </Flex>
          <SliderCounter
            min={0}
            max={transactionMax}
            value={transactionCount}
            setValue={setTransactionCount}
          />
        </Stack>
      </WebUiCard>
      <WebUiCard>
        <Flex justifyContent={'space-between'}>
          <Stack>
            <Heading size="md">{creationCount} creations</Heading>
            <Heading size="md">{transactionCount} Transaction</Heading>
            <Heading size="lg">Total</Heading>
          </Stack>
          <Stack alignItems="end">
            <Heading size="md">{creationTotal} SOL</Heading>
            <Heading size="md">{transactionTotal} SOL</Heading>
            <Heading size="lg">{total} SOL</Heading>
          </Stack>
        </Flex>
      </WebUiCard>
    </WebUiPage>
  );
}

export function SliderCounter({
  min,
  max,
  setValue,
  value,
}: {
  min: number;
  max: number;
  setValue: (num: number) => void;
  value: number;
}) {
  return (
    <Stack direction="row" spacing={6}>
      <Slider
        focusThumbOnChange={false}
        value={value}
        onChange={(val) => setValue(val)}
        min={min}
        max={max}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <NumberInput
        value={value}
        precision={0}
        step={100}
        onChange={(val) => setValue(Number(val))}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Stack>
  );
}
