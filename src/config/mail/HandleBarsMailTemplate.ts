import Handlebars from 'handlebars';

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
    const parseTemplate = Handlebars.compile(file);
    return parseTemplate(variables);
  }
}
