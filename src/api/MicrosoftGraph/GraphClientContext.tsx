// GraphContext.tsx
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { AccountInfo, IPublicClientApplication } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';
import { loginRequest } from './authConfig';

interface GraphContextProps {
  graphClient: Client | undefined;
}
interface GraphProviderProps {
  children: ReactNode;
}
const GraphContext = createContext<GraphContextProps | undefined>(undefined);

const GraphProvider = ({ children }: GraphProviderProps) => {
  const { instance, accounts } = useMsal();
  const [graphClient, setGraphClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    if (accounts.length > 0) {
      // Initialize Microsoft Graph client
      const client = createGraphClient(instance, accounts[0]);
      setGraphClient(client);
    } else {
      setGraphClient(undefined);
    }
  }, [instance, accounts]);

  const createGraphClient = (msalInstance: IPublicClientApplication, account: AccountInfo) => {
    // Initialize Microsoft Graph client using MSAL
    const client = Client.init({
      authProvider: async (done) => {
        try {
          const tokenResponse = await msalInstance.acquireTokenSilent({
            account: account,
            scopes: loginRequest.scopes, // Add the necessary scopes for your use case
          });

          if (tokenResponse && tokenResponse.accessToken) {
            done(null, tokenResponse.accessToken);
          } else {
            done('Unable to acquire token for Microsoft Graph.', null);
          }
        } catch (error) {
          done(error, null);
        }
      },
    });

    return client;
  };

  return (
    <GraphContext.Provider value={{ graphClient }}>
      {children}
    </GraphContext.Provider>
  );
};

const useGraphClient = (): GraphContextProps => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error('useGraphClient must be used within a GraphProvider');
  }
  return context;
};

export { GraphProvider, useGraphClient };
