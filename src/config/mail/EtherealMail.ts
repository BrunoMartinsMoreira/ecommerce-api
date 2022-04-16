import nodemailer from 'nodemailer';

interface IsendeMail {
  to: string;
  body: string;
}

export class EtherealMail {
  static async sendMail({ to, body }: IsendeMail): Promise<void> {
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
      from: 'bruno_moreira@fakeapi.teste',
      to,
      subject: 'Teste de email fake',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
