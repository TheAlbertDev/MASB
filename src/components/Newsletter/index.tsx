import React from 'react';
import jsonp from 'jsonp';
import toQueryString from 'to-querystring';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Checkbox,
  Input,
  Button,
  theme,
} from '@chakra-ui/react';
import myTheme from '../../theme';

const formAttributes = {
  type: 'get',
  url: 'https://instagram.us18.list-manage.com/subscribe/post-json?u=797b7fe8898b259dc0cd46cdc&amp;id=6691900a38&c=?',
  cache: false,
  dataType: 'jsonp',
  contentType: 'application/json; charset=utf-8',
};

const Newsletter = () => {
  const [email, setEmail] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [suscriptionMessage, setSuscriptionMessage] = React.useState<
    string | undefined
  >();
  const [
    b_797b7fe8898b259dc0cd46cdc_6691900a38,
    setb_797b7fe8898b259dc0cd46cdc_6691900a38,
  ] = React.useState('');
  const [formValidationState, setFormValidationState] = React.useState({
    email: false,
    checked: false,
    b_797b7fe8898b259dc0cd46cdc_6691900a38: true,
  });
  const [formValidationMessage, setFormValidationMessage] = React.useState({
    email: '',
    checked: '',
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValidationState(prevState => ({
      ...prevState,
      email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        e.target.value
      ),
    }));
    setEmail(e.target.value);
  };
  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValidationState(prevState => ({
      ...prevState,
      checked: e.target.checked,
    }));
    setChecked(e.target.checked);
  };
  const handleb_797b7fe8898b259dc0cd46cdc_6691900a38 = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValidationState(prevState => ({
      ...prevState,
      b_797b7fe8898b259dc0cd46cdc_6691900a38: e.target.value === '',
    }));
    setb_797b7fe8898b259dc0cd46cdc_6691900a38(e.target.value);
  };
  const validateForm = (): boolean => {
    setFormValidationMessage({
      email: formValidationState.email
        ? ''
        : 'Indica una dirección de correo válida, por favor.',
      checked: formValidationState.checked
        ? ''
        : 'Debes de marcar esta casilla para poder suscribirte.',
    });
    return Object.values(formValidationState).every(
      validation => validation === true
    );
  };
  const submitForm = async () => {
    if (!validateForm()) return;

    jsonp(
      'https://instagram.us18.list-manage.com/subscribe/post-json?u=797b7fe8898b259dc0cd46cdc&amp;id=6691900a38' +
        '&' +
        toQueryString({
          EMAIL: email,
          'gdpr[80334]': checked,
        }),
      {
        param: 'c',
      },
      (error, data) => {
        if (error) setSuscriptionMessage(data.msg);
        else setSuscriptionMessage(data.msg);
      }
    );
  };
  return (
    <form
      action={formAttributes.url}
      method={formAttributes.type}
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      target="_blank"
      noValidate={false}
      onSubmit={submitForm}
      autoComplete="nope"
    >
      <FormControl isInvalid={formValidationMessage.email !== ''}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          name="EMAIL"
          isRequired
          id="mce-EMAIL"
          onChange={handleEmailChange}
          autoComplete="nope"
          borderColor={myTheme.colors.bgColor}
          color={myTheme.colors.bgColor}
        />
        <FormErrorMessage>{formValidationMessage.email}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={formValidationMessage.checked !== ''} mt={8}>
        <FormLabel>Permisos</FormLabel>
        <FormHelperText color={myTheme.colors.bgColor}>
          Por favor, selecciona las formas en las que le gustaría recibir
          noticias:
        </FormHelperText>
        <Checkbox
          isRequired
          id="gdpr_80334"
          name="gdpr[80334]"
          isChecked={checked}
          onChange={handleCheckChange}
          autoComplete="nope"
          borderColor={myTheme.colors.bgColor}
        >
          Via email
        </Checkbox>

        <FormErrorMessage>{formValidationMessage.checked}</FormErrorMessage>
        <FormHelperText color={myTheme.colors.bgColor} mt={8}>
          Puedes darte de baja en cualquier momento haciendo clic en el enlace
          en el pie de página de los correos electrónicos.
        </FormHelperText>
        <FormHelperText color={myTheme.colors.bgColor}>
          Utilizamos Mailchimp como plataforma de marketing. Al hacer clic abajo
          para suscribirse, usted reconoce que su información será transferida a
          Mailchimp para su procesamiento.
          <a href="https://mailchimp.com/legal/terms" target="_blank">
            Obtenga más información sobre las prácticas de privacidad de
            Mailchimp aquí.
          </a>
        </FormHelperText>
      </FormControl>
      {/*
      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        */}
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden={true}>
        <input
          type="text"
          name="b_797b7fe8898b259dc0cd46cdc_6691900a38"
          tabIndex={-1}
          value={b_797b7fe8898b259dc0cd46cdc_6691900a38}
          onChange={handleb_797b7fe8898b259dc0cd46cdc_6691900a38}
        />
      </div>
      <FormControl>
        <Button
          type="submit"
          name="subscribe"
          id="mc-embedded-subscribe"
          onClick={e => {
            e.preventDefault();
            submitForm();
          }}
          variant="outline"
          my={8}
          colorScheme="black"
          color={myTheme.colors.bgColor}
          borderColor={myTheme.colors.bgColor}
        >
          Suscribirse
        </Button>
        {suscriptionMessage && (
          <FormHelperText
            color={myTheme.colors.bgColor}
            dangerouslySetInnerHTML={{ __html: suscriptionMessage }}
          />
        )}
      </FormControl>
    </form>
  );
};

export default Newsletter;
