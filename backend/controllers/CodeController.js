
const Code = require('../models/Code');


exports.getCodes = async (req, res) => {
  try {
    const codes = await Code.find();
    res.status(200).json(codes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getCodeById = async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);
    if (!code) return res.status(404).json({ message: "Code non trouvé" });
    res.status(200).json(code);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createCode = async (req, res) => {
  try {
    const newCode = new Code(req.body);
    await newCode.save();
    res.status(201).json(newCode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateCode = async (req, res) => {
  try {
    const updatedCode = await Code.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCode) return res.status(404).json({ message: "Code non trouvé" });
    res.status(200).json(updatedCode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteCode = async (req, res) => {
  try {
    const deletedCode = await Code.findByIdAndDelete(req.params.id);
    if (!deletedCode) return res.status(404).json({ message: "Code non trouvé" });
    res.status(200).json({ message: "Code supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
