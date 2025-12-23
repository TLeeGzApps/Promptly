import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2 } from 'lucide-react';

const supportedModels = [
    { name: 'Gemini 2.5 Flash', provider: 'Google', supported: true },
    { name: 'OpenAI GPT-4', provider: 'OpenAI', supported: true },
    { name: 'Anthropic Claude 3', provider: 'Anthropic', supported: true },
    { name: 'DeepSeek', provider: 'DeepSeek', supported: true },
];

export default function ModelsSupportedPage() {
  return (
    <>
      <PageHeader
        title="Models Supported"
        description="We support a wide range of leading AI models for generation, conversion, and translation."
      />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead className="text-right">Supported</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supportedModels.map((model) => (
                <TableRow key={model.name}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>{model.provider}</TableCell>
                  <TableCell className="text-right">
                    {model.supported && (
                      <div className="flex items-center justify-end text-primary">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
