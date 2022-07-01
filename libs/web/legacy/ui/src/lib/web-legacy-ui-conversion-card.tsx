import { Alert, Box, ButtonGroup, Code, Stack } from '@chakra-ui/react';
import { Keypair } from '@kin-laboratory/keypair';
import { WebUiButton } from '@kin-laboratory/web/ui/button';
import { WebUiPre } from '@kin-laboratory/web/ui/pre';
import { Field, Form, FormLayout } from '@saas-ui/react';
import { useState } from 'react';

interface ConvertStellarKey {
  stellarSecret: string;
  onSuccess?: (solanaKeyPair: Keypair) => void;
  onFailure?: (error: string) => void;
}

function convertStellarKey({
  stellarSecret,
  onSuccess,
  onFailure,
}: ConvertStellarKey) {
  let solanaKeyPair;
  try {
    solanaKeyPair = Keypair.fromStellarKeypair(stellarSecret);
  } catch (error) {
    console.log('🚀 ~ error', error);
    if (onFailure) {
      onFailure(`${error}`);
    }
  }

  console.log(stellarSecret);
  if (onSuccess && solanaKeyPair) {
    onSuccess(solanaKeyPair);
  }
}

export function WebLegacyUiConversionCard() {
  const [stellarSecret, setStellarSecret] = useState('');
  const [error, setError] = useState('');
  const [showByteArray, setShowByteArray] = useState(false);
  console.log('🚀 ~ error', error);
  const [solanaKeypair, setSolanaKeypair] = useState<Keypair | null>(null);
  console.log('🚀 ~ solanaKeypair', solanaKeypair);
  const showByteArrayButton = (
    <WebUiButton
      size="lg"
      disabled={!solanaKeypair}
      onClick={() => {
        setShowByteArray((ba) => !ba);
      }}
      label={(showByteArray ? 'Hide' : 'Show') + ' Byte Array'}
    />
  );
  const convertStellarButton = (
    <WebUiButton
      size="lg"
      disabled={!stellarSecret}
      onClick={() => {
        setError('');
        stellarSecret &&
          convertStellarKey({
            stellarSecret,
            onSuccess: (kp) => setSolanaKeypair(kp),
            onFailure: (error) => setError(error),
          });
      }}
      label="Convert"
    />
  );
  return (
    <Stack spacing={6}>
      <Form onSubmit={() => console.log()}>
        <FormLayout>
          <Field
            size="lg"
            colorScheme="primary"
            label="Stellar Seed"
            value={stellarSecret}
            onChange={(e: any) => setStellarSecret(e.target?.value)}
            type="text"
            name="stellarKey"
            id="stellarKey"
            placeholder="e.g. SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7"
          />
        </FormLayout>
      </Form>

      <ButtonGroup>
        {convertStellarButton} {showByteArrayButton}
      </ButtonGroup>

      {solanaKeypair && !error ? (
        <Box>
          <WebUiPre>
            {JSON.stringify(
              {
                publicKey: solanaKeypair.publicKey,
                secretKey: solanaKeypair.secretKey,
              },
              null,
              2
            )}
          </WebUiPre>
          {showByteArray && (
            <Box>
              <Code colorScheme="primary">byteArray:</Code>
              <WebUiPre>
                {'[' + solanaKeypair?.solanaSecretKey?.join(', ') + ']'}
              </WebUiPre>
            </Box>
          )}
        </Box>
      ) : null}

      {error ? <Alert status={'error'}>{error}</Alert> : null}
    </Stack>
  );
}
