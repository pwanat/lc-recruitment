import './App.css';
import '@livechat/design-system-react-components/dist/style.css';
import { CannedResponses } from './components/canned-responses/CannedResponses';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return  (
    <QueryClientProvider client={queryClient}>
    <CannedResponses />
  </QueryClientProvider>
  )
}

export default App;
