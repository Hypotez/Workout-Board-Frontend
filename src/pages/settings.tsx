import { useEffect, useState } from 'react';
import { Database, Wifi, WifiOff, HelpCircle } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import httpClient from '@/service/httpClient';
import { SettingsSchema, type Settings } from '@backend/schemas/shared/settings';
import { showError } from '@/lib/toast';

type DataSource = 'hevy' | 'dummy';

export default function Settings() {
  const queryClient = useQueryClient();
  const settingsQuery = useQuery({
    queryKey: ['settings'],
    queryFn: async (): Promise<Settings | null> => {
      return await httpClient('/v1/settings', {
        method: 'GET',
      });
    }
  });
  const [dataSource, setDataSource] = useState<DataSource>('dummy');
  const [apiKey, setApiKey] = useState('');

  const saveMutation = useMutation({
    mutationFn: async (payload: Settings) => {
      await httpClient('/v1/settings', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['settings'] });
      await queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: () => {
      showError('Failed to save settings. Please try again.');
    },
  });

  const isSaving = saveMutation.isPending;

  useEffect(() => {
    if (settingsQuery.isError) {
      showError('Failed to fetch settings. Please try again.');
    }
  }, [settingsQuery.isError]);

  useEffect(() => {
    if (settingsQuery.data) {
      setApiKey(settingsQuery.data.hevy_api_key);
      setDataSource(settingsQuery.data.use_hevy_api ? 'hevy' : 'dummy');
    }
  }, [settingsQuery.data]);

  const handleSave = () => {
    const hevyApiKey = apiKey;
    const useHevyApi = dataSource === 'hevy';

    const settings = SettingsSchema.safeParse({
      hevy_api_key: hevyApiKey,
      use_hevy_api: useHevyApi,
    });

    if (!settings.success) {
      return;
    }

    saveMutation.mutate(settings.data);
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Source
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label className="text-base font-medium">Choose your data source:</Label>

              <div
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  dataSource === 'dummy'
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-muted-foreground/30'
                }`}
                onClick={() => setDataSource('dummy')}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      dataSource === 'dummy'
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <WifiOff className="h-4 w-4" />
                      <span className="font-medium">Dummy Data</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Use sample workout data for testing
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  dataSource === 'hevy'
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-muted-foreground/30'
                }`}
                onClick={() => setDataSource('hevy')}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      dataSource === 'hevy'
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4" />
                      <span className="font-medium">Hevy API</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Connect to your real Hevy workout data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {dataSource === 'hevy' && (
          <Card>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="api-key">Hevy API Key</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-5 w-5 p-0 rounded-full">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-80">
                        <div className="space-y-2">
                          <h4 className="font-medium">How to get your Hevy API Key</h4>
                          <ol className="space-y-1 text-sm">
                            <li>1. Open the Hevy app and go to your profile</li>
                            <li>2. Navigate to Settings → Developer</li>
                            <li>3. Generate a new API key</li>
                            <li>4. Copy the key and paste it above</li>
                          </ol>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="relative">
                  <Input
                    id="api-key"
                    type="text"
                    placeholder="Enter your Hevy API key..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent>
            <Button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 cursor-pointer hover:cursor-pointer"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
