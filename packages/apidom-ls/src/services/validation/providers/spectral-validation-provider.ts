import { Diagnostic } from 'vscode-languageserver-types';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Element } from '@swagger-api/apidom-core';
import { Ruleset, RulesetDefinition, Spectral } from '@stoplight/spectral-core';
import { IConstructorOpts } from '@stoplight/spectral-core/dist/types';
// @ts-ignore
import { bundleAndLoadRuleset } from '@stoplight/spectral-ruleset-bundler/with-loader';
import { fetch } from '@stoplight/spectral-runtime';

import {
  LanguageSettings,
  MergeStrategy,
  NamespaceVersion,
  ValidationContext,
  ValidationProvider,
  ValidationProviderResult,
} from '../../../apidom-language-types';
import { isJsonDoc } from '../../../utils/utils';

// eslint-disable-next-line import/prefer-default-export
export class SpectralValidationProvider implements ValidationProvider {
  protected spectral: Spectral;

  protected ruleset: Ruleset | RulesetDefinition | undefined;

  protected rulesetFileContent: string | undefined;

  private validationEnabled: boolean | undefined;

  public constructor(
    ruleset: Ruleset | RulesetDefinition | string,
    opts?: IConstructorOpts | undefined,
  ) {
    this.spectral = new Spectral(opts);

    if (typeof ruleset === 'string' || ruleset instanceof String) {
      this.rulesetFileContent = ruleset as string;
    } else {
      this.ruleset = ruleset;
    }
  }

  public async doValidation(
    textDocument: TextDocument,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api: Element,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentDiagnostics: Diagnostic[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationContext?: ValidationContext,
  ): Promise<ValidationProviderResult> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const text = textDocument.getText();
    const isYaml = !(await isJsonDoc(text));

    const diagnostics: Diagnostic[] = [];

    // get the serialized apidom JSON if doc is yaml
    let jsonText = text;
    if (isYaml) {
      // jsonText = JSON.stringify(api.toValue());
      jsonText = text;
    }
    if (!this.validationEnabled) {
      return {
        diagnostics,
        mergeStrategy: MergeStrategy.IGNORE,
      };
    }

    const { ruleset, rulesetFileContent } = this;

    if (ruleset) {
      this.spectral.setRuleset(ruleset);
    } else if (rulesetFileContent) {
      try {
        const fsSpectral = {
          promises: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async readFile(filepath: string) {
              console.log('reading rulesetFileContent');
              return rulesetFileContent;
            },
          },
        };
        this.spectral.setRuleset(
          await bundleAndLoadRuleset('/spectral.yaml', { fs: fsSpectral, fetch }),
        );
      } catch (e) {
        console.error(e);
      }
    }

    const spectralDiagnostics = await this.spectral.run(jsonText);

    spectralDiagnostics.forEach((spectralDiagnostic) => {
      const diagnostic = Diagnostic.create(
        spectralDiagnostic.range,
        spectralDiagnostic.message || '',
        // @ts-ignore
        spectralDiagnostic.severity,
        spectralDiagnostic.code,
        'spectral',
      );
      diagnostics.push(diagnostic);
    });
    return {
      diagnostics,
      mergeStrategy: MergeStrategy.REPLACE,
    };
  }

  public configure(settings?: LanguageSettings): void {
    if (settings) {
      this.validationEnabled = settings.validate;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  break(): boolean {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  namespaces(): NamespaceVersion[] {
    return [
      { namespace: 'openapi', version: '3.1.0' },
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
      { namespace: 'asyncapi', version: '2.0.0' },
      { namespace: 'asyncapi', version: '2.1.0' },
      { namespace: 'asyncapi', version: '2.2.0' },
      { namespace: 'asyncapi', version: '2.3.0' },
      { namespace: 'asyncapi', version: '2.4.0' },
      { namespace: 'asyncapi', version: '2.5.0' },
      { namespace: 'asyncapi', version: '2.6.0' },
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  name(): string {
    return 'spectral';
  }
}
