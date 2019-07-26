import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			songs: [],
			audioToggles: false,
			selectedIndex: null
		};
	}

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(resp => resp.json())
			.then(songs => this.setState({ songs }));
	}
	audioActive() {
		this.setState({ audioToggles: true });
	}

	audioClick(e) {
		e.target.play();
	}

	render() {
		return (
			<div className="container">
				<div className="">
					<div>
						{this.state.songs ? (
							this.state.songs.map((item, index) => {
								return (
									<div
										key={index}
										onClick={e =>
											this.setState({
												selectedIndex: index
											})
										}
										className="bg-dark border text-white p-2 outers">
										<span className="text-secondary">
											{index}
										</span>
										<span
											onClick={() => this.audioActive()}>
											{item.name} -{" "}
										</span>
										{this.state.selectedIndex === index && (
											<audio
												type="audio/mp3"
												controls
												src={
													"https://assets.breatheco.de/apis/sound/" +
													item.url
												}
												onClick={e =>
													this.audioClick(e)
												}
											/>
										)}
									</div>
								);
							})
						) : (
							<div>Loading</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
