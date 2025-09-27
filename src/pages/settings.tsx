import { useState } from 'react';
import { Eye, EyeOff, Save, Database, Wifi, WifiOff, HelpCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type DataSource = 'hevy' | 'dummy';

export default function Settings() {
  const [dataSource, setDataSource] = useState<DataSource>('dummy');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('dataSource', dataSource);

      if (dataSource === 'hevy') {
        localStorage.setItem('hevyApiKey', apiKey);
      }

      setIsLoading(false);
      setSaved(true);

      setTimeout(() => setSaved(false), 3000);
    }, 1000);
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
                    type={showApiKey ? 'text' : 'password'}
                    placeholder="Enter your Hevy API key..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent cursor-pointer hover:cursor-pointer"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 cursor-pointer hover:cursor-pointer"
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4 animate-pulse" />
                  <span className="animate-pulse">Settings Saved!</span>
                </>
              ) : isLoading ? (
                <>
                  <Save className="h-4 w-4" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
