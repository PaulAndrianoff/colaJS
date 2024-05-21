import { Component } from "../cola/component.js";
import { Utils } from "../cola/utils.js";
import { ApiTest } from "../services/apiTest.js";

export class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { breeds: [] };
        this.willMount = true;
    }

    async componentWillMount() {
        const api = new ApiTest();
        const data = await api.fetchData('https://dogapi.dog/api/v2/breeds');
        this.setState({ breeds: data });
    }

    render() {
        const test = Utils.createElement("div", {}, [
            Utils.createElement("h1", {}, ["Test Page"]),
            Utils.createElement("p", {}, ["This is a test page."]),
        ]);

        this.state.breeds.forEach((breed) => {
            const elem = Utils.createElement(
                "div",
                {
                    class: "breed",
                },
                [
                    Utils.createElement("h2", {}, [breed.attributes.name]),
                    Utils.createElement("p", {}, [
                        breed.attributes.description,
                    ]),
                ]
            );
            test.appendChild(elem);
        });

        return test;
    }
}
