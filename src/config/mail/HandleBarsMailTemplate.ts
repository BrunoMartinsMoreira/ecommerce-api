import Handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVars {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVars;
}

export class HandlebarsMailTemplate {
  public async parser({
    file,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = Handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}
