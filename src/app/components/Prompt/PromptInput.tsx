type Props = {
  prompt: string;
  setPrompt: (value: string) => void;
};
const PromptInput = ({ prompt, setPrompt }: Props) => {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-2" htmlFor="prompt">
        Enter your prompt:
      </label>
      <input
        id="prompt"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your prompt here..."
      />
    </div>
  );
};

export default PromptInput;
