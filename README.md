# HUG-VIS

**HUG-VIS: A Controlled Multi-Modal Evaluation Benchmark for Affective Digital Humans**

![HUG-VIS overview](images/main_2.png)

HUG-VIS is a controlled multi-modal evaluation benchmark for affective digital humans. Instead of evaluating avatar systems as isolated talking-head generators, HUG-VIS treats them as coupled multimodal systems where identity, affect, language, motion, foreground quality, and audio-visual synchronization can be analyzed together.

The dataset contains **8,400 green-screen seated half-body performances** from **30 actors**, crossing **7 emotions**, **4 action templates**, and **10 scripts**. Each sample provides synchronized audio, video, text, metadata, soft alpha mattes, and RGBA foregrounds, enabling paired and compositable evaluation units for controlled failure attribution.

Dataset and code will be released at:

```text
https://github.com/GML-MMGroup/HUG-VIS
```

> This README is a release draft. Dataset download links, benchmark tables, and citation metadata will be updated before the public release.

## Overview

Affective digital humans are becoming interfaces for communication and interaction, but their evaluation is often fragmented. Core modules are commonly benchmarked on disjoint datasets, making it difficult to determine why a generated avatar fails. The cause may be identity drift, weakened affect, script bias, foreground corruption, motion collapse, or audio-visual desynchronization.

HUG-VIS is designed to support controlled evaluation and failure attribution. It provides aligned audio-video-text samples under a green-screen capture setup, together with foreground alpha mattes and RGBA foreground videos. This allows researchers to vary or fix identity, affect, action, language, and foreground quality when testing affective avatar systems.

## Planned Figures

The following figures will be added to the release page and paper repository:

- **Main pipeline figure:** capture site, script and action design, recording protocol, data processing, and released data components.
- **Foreground segmentation/matting figure:** green-screen input, soft alpha matte, RGBA foreground, and compositing examples.
- **Dataset gallery:** representative frames across actors, emotions, actions, and scripts.
- **Benchmark overview:** four evaluation tracks and metrics.

Suggested paths:

```text
images/
├── main_2.png
├── matting_examples.png
├── dataset_gallery.png
└── benchmark_overview.png
```

## Dataset Statistics

| Item | Value |
| --- | ---: |
| Actors | 30 |
| Emotions | 7 |
| Action templates | 4 |
| Scripts per emotion-action condition | 10 |
| Total clips | 8,400 |
| Capture setup | Seated half-body performance with desk and green screen |
| Released modalities | Audio, video, text, metadata, alpha mattes, RGBA foregrounds |

Total number of clips:

```text
30 actors x 7 emotions x 4 action templates x 10 scripts = 8,400 clips
```

## Data Design

Each actor performs the same script and action design under seven affective states:

- happy
- surprised
- angry
- sad
- fearful
- disgusted
- neutral

For each emotion, we define four coarse action templates. Each action template contains ten scripted utterances, producing 40 utterances per emotion for each actor.

Every utterance starts from a canonical initial state where the actor places both hands on the table. The actor then speaks the script while performing the corresponding emotional action, and finally returns to the initial state. Actors follow the same action reference, but natural variations are preserved across scripts and performers.

All actors share the same script set. Reading errors are corrected using automatic speech recognition followed by manual checking.

## Released Data

HUG-VIS will release the following components:

| Component | Description |
| --- | --- |
| Audio | Speech waveform for each utterance |
| Processed video | Synchronized processed video clips |
| Text | Corrected transcripts and script metadata |
| Metadata | Actor ID, emotion, action template, script ID, duration, frame rate, and paths |
| Soft alpha mattes | Per-frame foreground alpha labels |
| RGBA foregrounds | Foreground human videos with alpha channel |
| Split files | Recommended train/validation/test splits |
| Benchmark results | Evaluation results for the four tracks |
| Evaluation code | Scripts for metrics and benchmark reproduction |

## Recommended Directory Structure

```text
HUG-VIS/
├── metadata/
│   ├── actors.csv
│   ├── clips.csv
│   ├── splits/
│   │   ├── train.txt
│   │   ├── val.txt
│   │   └── test.txt
│   ├── emotions.json
│   ├── actions.json
│   └── scripts.json
├── audio/
│   └── actor_0001/
│       └── happy/
│           └── action_01/
│               └── script_001.wav
├── video_processed/
│   └── actor_0001/
│       └── happy/
│           └── action_01/
│               └── script_001.mp4
├── alpha_matte/
│   └── actor_0001/
│       └── happy/
│           └── action_01/
│               └── script_001/
│                   ├── 000000.png
│                   ├── 000001.png
│                   └── ...
├── rgba_foreground/
│   └── actor_0001/
│       └── happy/
│           └── action_01/
│               └── script_001.mov
└── transcripts/
    └── actor_0001/
        └── happy/
            └── action_01/
                └── script_001.txt
```

Suggested clip ID:

```text
actor_{actor_id}_{emotion}_action_{action_id}_script_{script_id}
```

Example:

```text
actor_0001_happy_action_01_script_001
```

## Metadata Format

### `clips.csv`

Recommended fields:

| Field | Description |
| --- | --- |
| `clip_id` | Unique clip identifier |
| `actor_id` | Actor identifier |
| `emotion` | Emotion label |
| `action_id` | Action template ID |
| `script_id` | Script ID |
| `transcript` | Corrected transcript |
| `asr_transcript` | Raw ASR transcript, if released |
| `audio_path` | Relative path to audio |
| `video_path` | Relative path to processed video |
| `alpha_matte_path` | Relative path to alpha matte frames |
| `rgba_foreground_path` | Relative path to RGBA foreground video |
| `duration` | Duration in seconds |
| `fps` | Video frame rate |
| `sample_rate` | Audio sample rate |
| `resolution` | Video resolution |

### `actions.json`

Each emotion contains four action templates. Each template is performed with ten scripts.

```json
{
  "happy": [
    {
      "action_id": 1,
      "script_ids": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "description": "TODO: describe the action reference"
    }
  ]
}
```

## Download

| Part | Content | Link |
| --- | --- | --- |
| Academic-use license | Application form for non-commercial academic research access | [Download the license form](HUG-VIS_Dataset_Academic_Use_License.docx) |
| Audio | Speech clips | `TODO` |
| Processed videos | Synchronized processed videos | `TODO` |
| Text and metadata | Transcripts, labels, and split files | `TODO` |
| Soft alpha mattes | Per-frame alpha labels | `TODO` |
| RGBA foregrounds | Compositable foreground videos | `TODO` |
| Evaluation code | Benchmark scripts and metrics | `TODO` |
| Benchmark results | Tables for all four tracks | `TODO` |

## Benchmark Tracks

HUG-VIS instantiates four benchmark tracks and evaluates more than 60 system configurations.

### Track 1: Voice Cloning

This track evaluates whether a model can synthesize high-quality speech while preserving speaker identity and affective expression.

Metrics:

| Metric | Direction | Description |
| --- | --- | --- |
| UTMOS | Higher is better | Automatic speech quality estimation |
| DNSMOS | Higher is better | Non-intrusive speech quality estimation |

Results:

| Model | UTMOS | DNSMOS |
| --- | ---: | ---: |
| Model-1 | `TODO` | `TODO` |
| Model-2 | `TODO` | `TODO` |
| Model-3 | `TODO` | `TODO` |
| Model-4 | `TODO` | `TODO` |
| Model-5 | `TODO` | `TODO` |
| Model-6 | `TODO` | `TODO` |

Observed issue to highlight in the paper: speech-quality predictors may favor synthetic voices while missing identity drift.

### Track 2: Foreground Matting

This track evaluates green-screen foreground extraction. We evaluate both segmentation models and matting models, and release soft alpha mattes and RGBA foregrounds for compositing.

Model groups:

- 3 segmentation models
- 6 matting models

Metrics:

| Metric | Direction | Description |
| --- | --- | --- |
| MAD | Lower is better | Mean absolute difference |
| MSE | Lower is better | Mean squared error |
| dtSSD_mean | Lower is better | Temporal stability error |
| Grad_mean | Lower is better | Gradient error |
| Conn_mean | Lower is better | Connectivity error |

Segmentation models:

| Model | MAD | MSE | dtSSD_mean | Grad_mean | Conn_mean |
| --- | ---: | ---: | ---: | ---: | ---: |
| Segmentation-1 | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |
| Segmentation-2 | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |
| Segmentation-3 | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |

Matting models:

| Model | MAD | MSE | dtSSD_mean | Grad_mean | Conn_mean |
| --- | ---: | ---: | ---: | ---: | ---: |
| Matting-1 | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |
| Matting-2 | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |
| Matting-3 | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |
| Matting-4 | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |
| Matting-5 | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |
| Matting-6 | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |

### Track 3: Multimodal Affect Recognition

This track evaluates emotion classification using single-modal and multimodal inputs.

Modalities:

- image frame
- audio
- video
- text
- video + audio
- video + text
- video + audio + text

Results:

| Modality | Accuracy |
| --- | ---: |
| Image frame | `TODO` |
| Audio | `TODO` |
| Video | `TODO` |
| Text | `TODO` |
| Video + audio | `TODO` |
| Video + text | `TODO` |
| Video + audio + text | `TODO` |

Observed issue to highlight in the paper: text can nearly match trimodal affect recognition, revealing lexical shortcuts and script bias.

### Track 4: Controllable Avatar Synthesis

This track evaluates digital human synthesis under different control signals.

Settings:

- head image + speech driving
- head image + extracted video pose driving
- head image + text driving
- half-body image + video pose driving

Metrics:

| Metric | Direction | Description |
| --- | --- | --- |
| PSNR | Higher is better | Pixel-level reconstruction quality |
| SSIM | Higher is better | Structural similarity |
| LPIPS | Lower is better | Perceptual distance |
| FID | Lower is better | Image distribution distance |
| FVD | Lower is better | Video distribution distance |
| SyncNet-Sync-C | Higher is better | Audio-visual synchronization confidence |
| SyncNet-Sync-D | Lower is better | Audio-visual synchronization distance |

Results:

| Setting | PSNR | SSIM | LPIPS | FID | FVD | SyncNet-Sync-C | SyncNet-Sync-D |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Head image + speech | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |
| Head image + video pose | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |
| Head image + text | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |
| Half-body image + video pose | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` | `TODO` |

Observed issue to highlight in the paper: synthesis leaders can split across fidelity, synchronization, identity, and coverage, so a single leaderboard score may hide failure modes.

## Evaluation Protocol

When reporting results on HUG-VIS, please include:

- train/validation/test split
- whether actors overlap between training and testing
- input modality or driving condition
- preprocessing details for audio, video, text, alpha mattes, and RGBA foregrounds
- model name, checkpoint source, and training data
- metric implementations and evaluation settings
- whether corrected transcripts or raw ASR transcripts are used

We recommend actor-independent evaluation for identity generalization and controlled comparisons that fix or vary only one factor at a time.

## Intended Use

HUG-VIS is intended for research on:

- affective digital humans
- controllable avatar synthesis
- speech-driven and text-driven human animation
- multimodal affect recognition
- green-screen segmentation and video matting
- controlled evaluation and failure attribution

## License and Ethics

Access to HUG-VIS is governed by the [HUG-VIS Dataset Academic Use License](HUG-VIS_Dataset_Academic_Use_License.docx). The dataset is available only for approved, non-commercial academic research. Applicants must download and complete the form, obtain the responsible applicant's signature, scan it, and submit it from the official institutional email address listed in the application. The submission address and official paper citation will be published before dataset access opens.

The agreement prohibits commercial use, redistribution, re-identification, impersonation, harmful or unlawful use, and public release of identifiable samples without prior written permission. It also requires secure storage and deletion when the research ends or access is withdrawn.

Because HUG-VIS contains recordings of human actors and can support realistic speech or video generation, users must follow responsible AI practices:

- use the dataset only for permitted research purposes
- do not attempt to identify, contact, or impersonate actors
- do not generate misleading, harmful, defamatory, or unauthorized synthetic media
- clearly disclose generated content when required
- do not redistribute the dataset outside the license terms

## Citation

If you use HUG-VIS in your research, please cite:

```bibtex
@misc{hugvis2026,
  title        = {HUG-VIS: A Controlled Multi-Modal Evaluation Benchmark for Affective Digital Humans},
  author       = {TODO},
  year         = {2026},
  howpublished = {\url{https://github.com/GML-MMGroup/HUG-VIS}},
}
```

## Contact

For questions about the dataset, please contact:

- **To:** [Zebang Cheng](mailto:zebang.cheng@gmail.com?cc=mafei%40gml.ac.cn) (`zebang.cheng@gmail.com`)
- **Cc:** `mafei@gml.ac.cn`
- **Project page:** <https://github.com/GML-MMGroup/HUG-VIS>
