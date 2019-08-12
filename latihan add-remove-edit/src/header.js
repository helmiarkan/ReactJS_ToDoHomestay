import Moment from "moment";
import React, { Component } from "react";
import Icon from '@material-ui/core/Icon';

class header extends Component {
    render() {
        let indonesia = require("moment/locale/id");
        Moment.updateLocale("id, indonesia");
        return(
            <div>
                <Icon>star</Icon> <h3> Aplikasi Aktivitas harian </h3> <Icon>star</Icon>
                <p> {Moment().format('dddd')} {Moment().format('LLL')} </p>
                <hr />
            </div>
        )
    }
}

export default header;