import summaryDetailsService from "../services/summaryDetailsService"

class SummaryDetailsController {
    handleCreateSummaryDetails = async(req, res) => {
        try {
            let data = await summaryDetailsService.createSummaryDetailsService(req.body);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        } catch(e) {
            return res.status(500).json({ message: e.message });
        }
    }

    handleFindAllSummaryDetails = async(req, res) => {
        let summaryId = req.params.id;
        try {
            await summaryDetailsService.findAllSummaryDetailsBySummaryIdService(summaryId)
            .then((data) => {res.status(200).json({
                  EM: data.EM,
                  EC: data.EC,
                  DT: data.DT,
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: err.message });
            });
        } catch(e) {
            return res.status(500).json({ message: e.message });
        }
    }

    handleDeleteSummaryDetails = async(req, res) => {
        try {
            let data = await summaryDetailsService.deleteViolationsSummaryDetail(req.params.id);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        } catch(e) {
            return res.status(500).json({ message: e.message });
        }
    }
}
module.exports = new SummaryDetailsController();
// createSummaryDetailsService,
// findAllSummaryDetailsBySummaryIdService,
// updateSummaryDetailService,
// deleteViolationsSummaryDetail,