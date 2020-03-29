import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginField from 'component/LoginField';
import onReset from 'eventhandler/templates/resetPassword/onReset';
import RememberMeCheckbox from 'component/checkbox/RememberMeCheckbox';
import listenOnline from 'hoc/listenOnline';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        const background = chrome.extension.getBackgroundPage();
        this.renderer = background.renderer;
        this.app = background.app;
        // properties
        this.i18n = this.app.util.i18n;
        this.user = this.app.util.user;
        // bindings
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {
            newPassword: '',
            confirmPassword: ''
        }
    }




    onInputChange({ target: { value, name } }) {
        switch (name) {
            case 'newPassword': {
                this.setState({ newPassword: value });
                break;
            }

            case 'confirmPassword': {
                this.setState({ confirmPassword: value });
                break;
            }

            default: {
                debug(`invalid name for login field: ${value}`);
            }
        }
    }

    handleSubmit(event) {
        return onReset(this.state, this.app, event);
    }

    resetPasswordURL() {
        return `https://${this.i18n.domainMap.get(this.i18n.locale)}/pages/reset-password`;
    }

    render() {


        return (
            <form id="login" onSubmit={this.handleSubmit}>
                <div className="col-xs-1" />

                <div className="col-xs-10">
                    <div className="text-danger bottom-gap col-xs-12 hidden" />

                    <div className="form-group">
                        <LoginField
                            autocomplete="off"
                            name="currentPassword"
                            type="password"
                            localeKey="CurrentPasswordPlaceholder"
                            onChange={this.onInputChange}
                            autoFocus={true}
                        />
                    </div>

                    <div className="form-group">
                        <LoginField
                            autocomplete="off"
                            name="newPassword"
                            type="password"
                            localeKey="NewPasswordPlaceholder"
                            onChange={this.onInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <LoginField
                            autocomplete="off"
                            name="confirmPassword"
                            type="password"
                            localeKey="ConfrimPasswordPlaceholder"
                            onChange={this.onInputChange}
                        />
                    </div>

                    <div className="form-group text-center">
                        <button id="submit-form-button" type="submit" className="btn-info form-control">
                            {t('ResetText')}
                        </button>
                        <button id="submit-form-button" type="submit" className="btn-danger form-control" onClick={this.props.func}>
                            {t('BackText')}
                        </button>

                    </div>
                </div>
            </form>
        );
    }
}

ResetPasswordForm.propTypes = {
    online: PropTypes.bool.isRequired,
};

export default listenOnline(ResetPasswordForm);
