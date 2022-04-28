const analyzeScreen = require('./analyze')
test('Testing whether Analyze Screen redirects to Results Screen', () =>{
    expect(analyzeScreen.res.redirect(`/ResultsScreenHTML?data=${services}`)).toBe(`/ResultsScreenHTML?data=${services}`)
}) 