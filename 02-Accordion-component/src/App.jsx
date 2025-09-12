
import './App.css'
import Accordion from './components/Accordion'

function App() {


  return (
    <>
      <Accordion items={[
    {
      title: "What is Github and how does it work?",
      content:
        "GitHub is the home for all developers—a platform where you can share code...",
    },
    {
      title: "How do I see GitHub's availability?",
      content: "Check our real-time status report",
    },
    {
      title: "Why is GitHub so popular?",
      content:
        "GitHub is built by developers for developers, and we’re proud to be home...",
    },
  ]} />
    </>
  )
}

export default App
