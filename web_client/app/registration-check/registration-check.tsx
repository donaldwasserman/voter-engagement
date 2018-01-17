import * as React from 'react';
import { observer } from 'mobx-react';
import { Voter } from 'models';
import { go } from 'router';

import { MainContentWrapper } from 'main-content-wrapper/main-content-wrapper';
import { ShortInput } from 'forms/short-input/short-input';
import { Button } from 'button/button';
import { Labelled } from 'forms/labelled/labelled';

// CSS
import { styles, vars, css, centeredBox } from 'styles/css';


export type RegistrationCheckProps = {

};

@observer
export class RegistrationCheck extends React.Component<RegistrationCheckProps, {}> {
  state = {
    firstName: "",
    lastName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    zipCode: "",
    voter: null as Voter
  }

  componentWillMount() {
    this.setState({voter: new Voter()});
  }

  setter(name: string) {
    return (value: string) => {
      this.setState({[name]: value});
    }
  }

  submit = () => {
    const { voter, firstName, lastName, birthDay, birthMonth, birthYear, zipCode } = this.state;
    
    Object.assign(voter, { firstName, lastName, birthDay, birthMonth, birthYear, zipCode });
    voter.checkRegistration().then(r => {
      if (r) {
        go('/registration-verified');
      } else {
        go('/not-registered');
      }
    })
  }

  render() {
    return (
      <MainContentWrapper>
        <div {...style.box}>
          <div {...style.maxWidth}>
            <h1 {...style.heading}>Are you registered?</h1>
            <ShortInput label="First Name" onChange={this.setter('firstName')} placeholder="Susan" value={this.state.firstName}/>
            <ShortInput label="Last Name" onChange={this.setter('lastName')} placeholder="Anthony" value={this.state.lastName}/>
            <Labelled label="Birth Date">
              <div {...style.inline}>
                <div {...style.monthInput}>
                  <ShortInput label="" onChange={this.setter('birthMonth')} value={this.state.birthMonth} placeholder="Month" />
                </div>
                <ShortInput label="" onChange={this.setter('birthDay')} value={this.state.birthDay} placeholder="Day" />
                <ShortInput label="" onChange={this.setter('birthYear')} value={this.state.birthYear} placeholder="Year" />
              </div>
            </Labelled>
            <ShortInput label="Zip Code" onChange={this.setter('zipCode')} value={this.state.zipCode}/>
            <Button action={this.submit} css={style.button}>Find Me!</Button>
          </div>
        </div>
      </MainContentWrapper>
    );
  }
}

const style = styles({
  button: {
    margin: '0 auto',
    display: 'block'
  },
  box: {
    padding: vars.spacing
  },
  heading: {
    marginBottom: vars.spacing
  },
  inline: {
    display: 'flex',
    margin: `0px ${-vars.smallSpacing/2}px`,
    ' label': {
      margin: `0px ${vars.smallSpacing/2}px`
    }
  },
  monthInput: {
      minWidth: 120
  },
  maxWidth: {
    maxWidth: 400,
    margin: '0 auto'
  }
});
