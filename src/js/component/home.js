import React from "react";

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
			<div>
				<div className="container">
					<span className="title-retro"> Audio Player Retro</span>

					<div>
						<div className="">
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
											<span
												className="text-secondary"
												id="number">
												{index}
											</span>
											<span
												className="pointed"
												onClick={() =>
													this.audioActive()
												}>
												{item.name}{" "}
											</span>
											{this.state.selectedIndex ===
												index && (
												<audio
													controls
													className="float-right"
													autoPlay
													type="audio/mp3"
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
			</div>
		);
	}
}
