import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

const ProjectCard = ({
  id,
  title,
  description,
  progress,
  tasks,
  onEdit,
  onDelete,
}) => {
  const [editModel, setEditModel] = useState(false);
  const [editMenu, setEditMenu] = useState(false);

  const [editedProjectName, setEditedProjectName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const handleEditSubmit = (e) => {
    e.preventDefault();

    onEdit({
      title: editedProjectName,
      description: editedDescription,
      id: id,
    });

    setEditMenu(false);
  };

  return (
    <div
      className="
        relative
        rounded-3xl p-6
        bg-gradient-to-br
        from-white/5
        via-slate-900/40
        to-violet-900/50
        backdrop-blur-xl
        border border-white/10
        shadow-xl
        hover:from-white/10
        hover:to-violet-900/60
        hover:border-violet-400/30
        hover:shadow-violet-500/10
        transition-all duration-300 
      "
    >
      {/* Header */}

      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-white">{title}</h2>

        <button
          onClick={() => {
            setEditModel(true);
          }}
          className="cursor-pointer"
        >
          <EllipsisVertical size={16} />
        </button>
      </div>

      {/* Description */}
      

      <p className="mt-2 text-sm text-slate-400 break-words line-clamp-2">
  {description}
</p>
    

      {/* Progress */}

      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-400">Progress</span>

          <span className="text-sm font-semibold text-white">{progress}%</span>
        </div>

        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="
              h-full rounded-full
              bg-gradient-to-r
              from-violet-600
              to-purple-400
              transition-all duration-500
            "
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tasks */}

      <div className="mt-5 text-sm text-slate-400">{tasks} Tasks</div>

      {/* Edit / Delete menu */}

      {editModel && (
        <div className="absolute right-4 top-14 z-10 flex gap-2 rounded-xl bg-slate-900/95 p-2 shadow-xl">
          <button
            onClick={() => {
              // Put existing data inside inputs
              setEditedProjectName(title);
              setEditedDescription(description);

              // Open modal
              setEditMenu(true);

              // Close small menu
              setEditModel(false);
            }}
            className="cursor-pointer border-2 px-3 py-1  rounded-3xl p-6
        bg-gradient-to-br
        from-white/5
        via-slate-900/40
        to-violet-900/50
        backdrop-blur-xl
        border border-white/10
        shadow-xl
        hover:from-white/10
        hover:to-violet-900/60
        hover:border-violet-400/30
        hover:shadow-violet-500/10
        transition-all duration-300"
          >
            Edit
          </button>

          <button
            onClick={() => {
              onDelete(id);
            }}
            className="cursor-pointer border-2 px-3 py-1  rounded-3xl p-6
        bg-gradient-to-br
        from-white/5
        via-slate-900/40
        to-violet-900/50
        backdrop-blur-xl
        border border-white/10
        shadow-xl
        hover:from-white/10
        hover:to-violet-900/60
        hover:border-violet-400/30
        hover:shadow-violet-500/10
        transition-all duration-300"
          >
            Delete
          </button>
        </div>
      )}

      {/* Edit Modal */}

      {editMenu && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}

          <div
            onClick={() => setEditMenu(false)}
            className="
              absolute inset-0
              bg-black/60
              backdrop-blur-sm
            "
          />

          {/* Modal */}

          <div
            className="
              relative
              flex min-h-screen
              items-center
              justify-center
              p-4
            "
          >
            <form
              onSubmit={handleEditSubmit}
              onClick={(e) => e.stopPropagation()}
              className="
                w-full max-w-md
                rounded-3xl
                p-6

                bg-gradient-to-br
                from-white/10
                via-slate-900/90
                to-violet-900/70

                backdrop-blur-xl

                border border-white/10
                shadow-2xl
              "
            >
              {/* Heading */}

              <h2 className="text-2xl font-bold mb-6 text-white">
                Edit Project
              </h2>

              {/* Project Name */}

              <div className="mb-5">
                <label className="block text-sm text-slate-300 mb-2">
                  Project Name
                </label>

                <input
                  type="text"
                  value={editedProjectName}
                  onChange={(e) => setEditedProjectName(e.target.value)}
                  placeholder="Enter project name"
                  required
                  className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    outline-none
                    focus:border-violet-400
                    transition
                    text-white
                  "
                />
              </div>

              {/* Description */}

              <div className="mb-6">
                <label className="block text-sm text-slate-300 mb-2">
                  Description
                </label>

                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Describe your project"
                  rows="4"
                  required
                  className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    outline-none
                    focus:border-violet-400
                    transition
                    resize-none
                    text-white
                  "
                />
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditMenu(false)}
                  className="
                    px-4 py-2
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    hover:bg-white/10
                    transition
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    px-5 py-2
                    rounded-xl
                    bg-violet-600
                    hover:bg-violet-500
                    transition
                  "
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
