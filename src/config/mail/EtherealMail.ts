import nodemailer from 'nodemailer';
import { HandlebarsMailTemplate } from './HandleBarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}
interface ITemplateVars {
  [key: string]: string | number;
}
interface IParseMailTemplate {
  template: string;
  variables: ITemplateVars;
}
interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();

    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Bruno Moreira comedor de casada',
        address: from?.email || 'bruno_moreira@fakeapi.teste',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parser(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
