import React from 'react';

const TerminalCard = () => {
  return (
    <div className="w-[280px] h-[260px] font-['Fira_Code',_monospace] rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-[8px] border border-white/10 bg-[rgba(33,33,33,0.75)]">
      {/* Terminal Toolbar */}
      <div className="flex h-[30px] items-center px-2 rounded-t-[5px] bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] justify-between shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]">
        {/* Window Control Buttons */}
        <div className="flex items-center gap-[5px]">
          <button className="w-3 h-3 rounded-full border-none shadow-[0px_0px_1px_0px_#41403a,0px_1px_1px_0px_#474642] transition-transform hover:scale-110 focus:outline-none bg-[radial-gradient(circle_at_30%_30%,#ff5f56,#bf2e2e)]" />
          <button className="w-3 h-3 rounded-full border-none shadow-[0px_0px_1px_0px_#41403a,0px_1px_1px_0px_#474642] transition-transform hover:scale-110 focus:outline-none bg-[radial-gradient(circle_at_30%_30%,#ffbd2e,#b4820e)]" />
          <button className="w-3 h-3 rounded-full border-none shadow-[0px_0px_1px_0px_#41403a,0px_1px_1px_0px_#474642] transition-transform hover:scale-110 focus:outline-none bg-[radial-gradient(circle_at_30%_30%,#27c93f,#199f2c)]" />
        </div>

        {/* User Display */}
        <p className="text-[#d5d0ce] ml-1.5 text-sm leading-[15px]">
          uiverse@admin: ~
        </p>

        {/* Add Tab Button */}
        <div className="border border-white text-white px-1.5 rounded-t cursor-pointer border-b-0 bg-white/5 hover:bg-white/10 transition-colors">
          +
        </div>
      </div>

      {/* Terminal Body */}
      <div className="bg-black/40 h-[calc(100%-30px)] pt-2 -mt-px text-[13px] rounded-b-[5px] border-t border-white/5 leading-[1.4]">
        <div className="flex flex-wrap">
          <span className="ml-1 text-[#00ffae] [text-shadow:0_0_4px_#00ffae]">
            uiverse@admin:
          </span>
          <span className="ml-1 text-[#3d9df6] [text-shadow:0_0_4px_#3d9df6]">
            ~
          </span>
          <span className="ml-1 text-white [text-shadow:0_0_3px_#ffffff]">
            $ welcome to uiverse
          </span>
          <span className="block h-[14px] w-[5px] ml-2.5 bg-white rounded-[1px] animate-blink" />
        </div>
      </div>
    </div>
  );
};

export default TerminalCard;
