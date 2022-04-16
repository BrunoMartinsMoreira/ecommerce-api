import Handlebars from 'handlebars';

interface ITemplateVars {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVars;
}

export class HandlebarsMailTemplate {
  public async parser({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parseTemplate = Handlebars.compile(template);
    return parseTemplate(variables);
  }
}
